import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const palette = {
  primary: '#1f64f2',
  muted: '#9ca3af',
  text: '#1f2937',
  success: '#10b981',
};

interface Step {
  number: number;
  title: string;
  subtitle: string;
}

interface ProgressTrackerProps {
  steps: Step[];
  currentStep: number;
  completion: number;
  compact?: boolean;
}

export default function ProgressTracker({ steps, currentStep, completion, compact = false }: ProgressTrackerProps) {
  if (compact) {
    return (
      <View style={styles.compactContainer}>
        <Text style={styles.compactTitle}>Progress</Text>
        
        {/* Horizontal Steps Row - Circles and Connectors */}
        <View style={styles.compactHorizontalSteps}>
          {steps.map((step, index) => {
            const isCompleted = index < currentStep - 1;
            const isCurrent = index === currentStep - 1;
            
            return (
              <View key={`circle-${step.number}`} style={styles.compactCircleWrapper}>
                <View
                  style={[
                    styles.compactStepCircle,
                    isCompleted && styles.compactStepCircleCompleted,
                    isCurrent && styles.compactStepCircleCurrent,
                  ]}>
                  {isCompleted ? (
                    <Text style={styles.compactCheckmark}>✓</Text>
                  ) : (
                    <Text style={[styles.compactStepNumber, isCurrent && styles.compactStepNumberCurrent]}>
                      {step.number}
                    </Text>
                  )}
                </View>
                {index < steps.length - 1 && (
                  <View style={[styles.compactHorizontalConnector, isCompleted && styles.compactConnectorCompleted]} />
                )}
              </View>
            );
          })}
        </View>

        {/* Step Titles Row - All Aligned at Start */}
        <View style={styles.compactStepTitlesRow}>
          {steps.map((step) => (
            <View key={`title-${step.number}`} style={styles.compactTitleContainer}>
              <Text style={styles.compactHorizontalStepTitle}>
                {step.title}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.compactCompletionSection}>
          <View style={styles.completionHeader}>
            <Text style={styles.completionLabel}>Completion</Text>
            <Text style={styles.completionPercent}>{completion}%</Text>
          </View>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${completion}%` }]} />
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Progress</Text>
      <Text style={styles.subtitle}>Registration Steps</Text>
      
      {/* Horizontal Steps Row - Circles and Connectors */}
      <View style={styles.horizontalSteps}>
        {steps.map((step, index) => {
          const isCompleted = index < currentStep - 1;
          const isCurrent = index === currentStep - 1;
          
          return (
            <View key={`circle-${step.number}`} style={styles.circleWrapper}>
              <View
                style={[
                  styles.stepCircle,
                  isCompleted && styles.stepCircleCompleted,
                  isCurrent && styles.stepCircleCurrent,
                ]}>
                {isCompleted ? (
                  <Text style={styles.checkmark}>✓</Text>
                ) : (
                  <Text style={[styles.stepNumber, isCurrent && styles.stepNumberCurrent]}>
                    {step.number}
                  </Text>
                )}
              </View>
              {index < steps.length - 1 && (
                <View style={[styles.horizontalConnector, isCompleted && styles.connectorCompleted]} />
              )}
            </View>
          );
        })}
      </View>

      {/* Step Titles Row - All Aligned at Start */}
      <View style={styles.stepTitlesRow}>
        {steps.map((step) => (
          <View key={`title-${step.number}`} style={styles.stepTitleContainer}>
            <Text style={styles.horizontalStepTitle}>{step.title}</Text>
            <Text style={styles.horizontalStepSubtitle}>{step.subtitle}</Text>
          </View>
        ))}
      </View>
      
      <View style={styles.completionSection}>
        <View style={styles.completionHeader}>
          <Text style={styles.completionLabel}>Completion</Text>
          <Text style={styles.completionPercent}>{completion}%</Text>
        </View>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${completion}%` }]} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  compactContainer: {
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    marginBottom: 16,
  },
  compactTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: palette.text,
    marginBottom: 12,
  },
  compactHorizontalSteps: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    justifyContent: 'space-around',
  },
  compactCircleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 60,
  },
  compactStepColumnContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
  },
  compactStepWithConnector: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 8,
  },
  compactHorizontalStepWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  compactStepTitlesRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 12,
  },
  compactTitleContainer: {
    alignItems: 'center',
    width: 60,
  },
  compactHorizontalStepTitle: {
    fontSize: 11,
    fontWeight: '600',
    color: palette.muted,
    flex: 1,
    textAlign: 'center',
    paddingHorizontal: 4,
  },
  compactStepCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: palette.muted,
    flexShrink: 0,
  },
  compactStepCircleCompleted: {
    backgroundColor: palette.primary,
    borderColor: palette.primary,
  },
  compactStepCircleCurrent: {
    backgroundColor: palette.primary,
    borderColor: palette.primary,
  },
  compactStepNumber: {
    fontSize: 12,
    fontWeight: '700',
    color: palette.muted,
  },
  compactStepNumberCurrent: {
    color: '#fff',
  },
  compactCheckmark: {
    fontSize: 14,
    fontWeight: '700',
    color: '#fff',
  },
  compactHorizontalConnector: {
    flex: 1,
    height: 2,
    backgroundColor: '#e5e7eb',
    marginHorizontal: 4,
  },
  compactConnectorCompleted: {
    backgroundColor: palette.primary,
  },
  compactStepTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: palette.muted,
    flex: 1,
  },
  compactStepTitleCurrent: {
    color: palette.text,
    fontWeight: '700',
  },
  compactCompletionSection: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  container: {
    width: '100%',
    maxWidth: 280,
    padding: 14,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: '800',
    color: palette.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 11,
    color: palette.muted,
    marginBottom: 12,
    fontWeight: '500',
  },
  horizontalSteps: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    justifyContent: 'space-between',
  },
  stepColumnContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
  },
  circleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 70,
  },
  stepWithConnector: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 12,
  },
  horizontalStepWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  horizontalConnector: {
    flex: 1,
    height: 2,
    backgroundColor: '#e5e7eb',
    marginHorizontal: 8,
  },
  stepTitlesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
    gap: 2,
  },
  stepTitleContainer: {
    alignItems: 'center',
    width: 70,
    paddingHorizontal: 2,
  },
  stepTitleWrapper: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  horizontalStepTitle: {
    fontSize: 10,
    fontWeight: '700',
    color: palette.text,
    textAlign: 'center',
    marginBottom: 3,
    lineHeight: 13,
  },
  horizontalStepSubtitle: {
    fontSize: 8,
    color: palette.muted,
    textAlign: 'center',
    lineHeight: 11,
    fontWeight: '500',
  },
  stepCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: palette.muted,
    flexShrink: 0,
  },
  stepCircleCompleted: {
    backgroundColor: palette.primary,
    borderColor: palette.primary,
  },
  stepCircleCurrent: {
    backgroundColor: palette.primary,
    borderColor: palette.primary,
  },
  stepNumber: {
    fontSize: 14,
    fontWeight: '700',
    color: palette.muted,
  },
  stepNumberCurrent: {
    color: '#fff',
  },
  checkmark: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
  connectorCompleted: {
    backgroundColor: palette.primary,
  },
  completionSection: {
    marginTop: 8,
  },
  completionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  completionLabel: {
    fontSize: 11,
    color: palette.muted,
    fontWeight: '500',
  },
  completionPercent: {
    fontSize: 13,
    fontWeight: '800',
    color: palette.primary,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e5e7eb',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: palette.primary,
    borderRadius: 4,
  },
});

