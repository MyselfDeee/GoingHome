import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Sample fee forecasting data structure
export interface FeeData {
  studentName: string;
  studentId: string;
  grade: string;
  annualFees: number;
  termFees: number;
  sportFees: number;
  registrationFee: number;
  reRegistrationFee: number;
  totalFees: number;
  paidAmount: number;
  outstandingAmount: number;
  paymentMethods: PaymentMethod[];
  paymentAlerts: PaymentAlert[];
}

export interface PaymentMethod {
  type: 'card' | 'bank_transfer' | 'debit_order';
  details: string;
  expiryDate?: string;
}

export interface PaymentAlert {
  type: 'due_soon' | 'overdue' | 'new_activity';
  message: string;
  date: string;
}

// Mock fee forecasting data (in production, this would come from your API)
export const mockFeeData: FeeData = {
  studentName: 'Mikhenso Rikhotso',
  studentId: '2020155260088',
  grade: 'Grade 12',
  annualFees: 32400,
  termFees: 8100,
  sportFees: 300,
  registrationFee: 800,
  reRegistrationFee: 400,
  totalFees: 42000,
  paidAmount: 0,
  outstandingAmount: 42000,
  paymentMethods: [
    {
      type: 'card',
      details: '•••• •••• •••• 4532',
      expiryDate: 'Exp 08/29',
    },
  ],
  paymentAlerts: [
    {
      type: 'due_soon',
      message: 'Payment Due Soon',
      date: 'December 15th due in 5 days',
    },
    {
      type: 'new_activity',
      message: 'New Activity Added',
      date: 'Drama Club show fee added',
    },
  ],
};

/**
 * Use OpenAI to analyze billing data and generate insights
 */
export async function generateBillingInsights(feeData: FeeData): Promise<string> {
  try {
    const prompt = `
      Analyze this billing data and provide a concise financial summary:
      
      Student: ${feeData.studentName}
      Total Fees: R ${feeData.totalFees}
      Paid Amount: R ${feeData.paidAmount}
      Outstanding Amount: R ${feeData.outstandingAmount}
      
      Fee Breakdown:
      - Annual Fees: R ${feeData.annualFees}
      - Term Fees: R ${feeData.termFees}
      - Sport Fees: R ${feeData.sportFees}
      - Registration Fee: R ${feeData.registrationFee}
      - Re-registration Fee: R ${feeData.reRegistrationFee}
      
      Please provide:
      1. A brief financial status summary
      2. Recommended payment plan
      3. Key action items for the parent
      
      Keep response concise and actionable.
    `;

    const message = await openai.messages.create({
      model: 'gpt-3.5-turbo',
      max_tokens: 500,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    const responseText = message.content
      .filter((block) => block.type === 'text')
      .map((block) => (block.type === 'text' ? block.text : ''))
      .join('\n');

    return responseText;
  } catch (error) {
    console.error('Error generating billing insights:', error);
    return 'Unable to generate billing insights at this time.';
  }
}

/**
 * Get fee data for a specific student
 * In production, this would fetch from your backend API
 */
export async function getStudentFeeData(studentId: string): Promise<FeeData> {
  try {
    // TODO: Replace with actual API call to your backend
    // const response = await fetch(`${process.env.REACT_APP_BILLING_API_URL}/student/${studentId}`);
    // const data = await response.json();
    // return data;

    // For now, return mock data
    return mockFeeData;
  } catch (error) {
    console.error('Error fetching fee data:', error);
    return mockFeeData;
  }
}

/**
 * Calculate payment plan options based on outstanding amount
 */
export function calculatePaymentPlans(feeData: FeeData): PaymentPlan[] {
  const outstanding = feeData.outstandingAmount;

  return [
    {
      name: 'Monthly Debit Order',
      amount: Math.ceil(outstanding / 12),
      frequency: 'Monthly',
      discount: '3%',
      discountedAmount: Math.ceil((outstanding * 0.97) / 12),
    },
    {
      name: 'Pay Per Term',
      amount: Math.ceil(outstanding / 3),
      frequency: 'Per Term',
      discount: '3%',
      discountedAmount: Math.ceil((outstanding * 0.97) / 3),
    },
    {
      name: 'Pay Once Per Year',
      amount: outstanding,
      frequency: 'Annual',
      discount: '5%',
      discountedAmount: Math.ceil(outstanding * 0.95),
    },
  ];
}

export interface PaymentPlan {
  name: string;
  amount: number;
  frequency: string;
  discount: string;
  discountedAmount: number;
}

/**
 * Format currency for display
 */
export function formatCurrency(amount: number): string {
  return `R ${amount.toLocaleString('en-ZA', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

/**
 * Get payment status color
 */
export function getPaymentStatusColor(outstanding: number, total: number): string {
  const percentage = (outstanding / total) * 100;

  if (percentage === 0) return '#10b981'; // Green - Paid
  if (percentage < 25) return '#3b82f6'; // Blue - Mostly paid
  if (percentage < 75) return '#f59e0b'; // Amber - Partially paid
  return '#ef4444'; // Red - Mostly unpaid
}
