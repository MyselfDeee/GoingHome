import express, { Router, Request, Response } from 'express';
import { verifyToken, AuthRequest } from '../middlewares/auth';
import env from '../config/env';
import { createClient } from '@supabase/supabase-js';

const router = Router();

// Initialize Supabase client
const supabase = createClient(env.supabaseUrl, env.supabaseServiceKey);

// Get user profile
router.get('/me', verifyToken, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ error: 'User ID not found' });
      return;
    }

    // Fetch from both parents and fee_responsibility tables
    const { data: parents, error: parentsError } = await supabase
      .from('parents')
      .select('*')
      .eq('user_id', userId)
      .limit(1)
      .single();

    const { data: feeResponsibility, error: feeError } = await supabase
      .from('fee_responsibility')
      .select('*')
      .eq('user_id', userId)
      .limit(1)
      .single();

    if (parentsError && parentsError.code !== 'PGRST116' && feeError && feeError.code !== 'PGRST116') {
      // Both queries failed
      throw parentsError || feeError;
    }

    // Get auth user info
    const { data: authUser, error: authError } = await supabase.auth.admin.getUserById(userId);

    if (authError) throw authError;

    // Construct profile response - merge data from both tables
    const profile = {
      id: userId,
      email: feeResponsibility?.parent_email || authUser?.user?.email || '',
      fullName: feeResponsibility?.parent_first_name && feeResponsibility?.parent_surname
        ? `${feeResponsibility.parent_first_name} ${feeResponsibility.parent_surname}`
        : parents?.first_name && parents?.surname 
          ? `${parents.first_name} ${parents.surname}` 
          : authUser?.user?.user_metadata?.full_name || 'User',
      phone: feeResponsibility?.parent_mobile || parents?.mobile || '',
      relationship: parents?.relationship || 'Parent',
      idNumber: feeResponsibility?.parent_id_number || parents?.id_number || '',
      feePerson: feeResponsibility?.fee_person || '',
      selectedPlan: feeResponsibility?.selected_plan || '',
      bankName: feeResponsibility?.bank_name || '',
      accountNumber: feeResponsibility?.account_number || '',
      accountType: feeResponsibility?.account_type || '',
      branchCode: feeResponsibility?.branch_code || '',
      createdAt: parents?.created_at || feeResponsibility?.created_at || null,
      updatedAt: parents?.updated_at || feeResponsibility?.updated_at || null,
    };

    res.json(profile);
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

// Update user profile
router.put('/me', verifyToken, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ error: 'User ID not found' });
      return;
    }

    const { fullName, email, phone, location } = req.body;

    // Parse name
    const nameParts = fullName.split(' ');
    const firstName = nameParts[0];
    const surname = nameParts.slice(1).join(' ');

    // Update in parents table
    const { data: updatedParent, error: updateError } = await supabase
      .from('parents')
      .update({
        first_name: firstName,
        surname: surname,
        mobile: phone,
        updated_at: new Date().toISOString(),
      })
      .eq('user_id', userId)
      .select()
      .single();

    if (updateError && updateError.code !== 'PGRST116') {
      // If no parent record exists, create one
      if (updateError.code === 'PGRST116') {
        const { data: newParent, error: insertError } = await supabase
          .from('parents')
          .insert([
            {
              user_id: userId,
              first_name: firstName,
              surname: surname,
              mobile: phone,
              relationship: 'Parent',
              email: email,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            },
          ])
          .select()
          .single();

        if (insertError) throw insertError;
        res.json({
          message: 'Profile created successfully',
          data: newParent,
        });
        return;
      }
      throw updateError;
    }

    res.json({
      message: 'Profile updated successfully',
      data: updatedParent,
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

// Change password
router.post('/change-password', verifyToken, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ error: 'User ID not found' });
      return;
    }

    const { currentPassword, newPassword } = req.body;

    // Use Supabase admin API to change password
    const { error } = await supabase.auth.admin.updateUserById(userId, {
      password: newPassword,
    });

    if (error) throw error;

    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error('Error changing password:', error);
    res.status(500).json({ error: 'Failed to change password' });
  }
});

export default router;
