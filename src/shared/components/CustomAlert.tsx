import { ActivityIndicator, Modal, Pressable, StyleSheet, Text, View } from 'react-native';

import { Colors } from '@/constants/colors';
import { useFeedback } from '@/contextapis/FeedbackContext';

export default function CustomAlert() {
  const {
    alertVisible,
    alertTitle,
    alertMessage,
    alertButtons,
    alertLoading,
    verticalButtons,
    hideAlert,
  } = useFeedback();

  return (
    <Modal
      animationType="fade"
      onRequestClose={hideAlert}
      statusBarTranslucent
      transparent
      visible={alertVisible}>
      <View style={styles.overlay}>
        <View accessibilityRole="alert" style={styles.alertBox}>
          {!!alertTitle && <Text style={styles.title}>{alertTitle}</Text>}
          {!!alertMessage && <Text style={styles.message}>{alertMessage}</Text>}
          <View style={[styles.buttonContainer, verticalButtons && styles.verticalButtonContainer]}>
            {alertButtons.map((button, index) => {
              const buttonStyle = button.style ?? 'default';
              return (
                <Pressable
                  accessibilityRole="button"
                  disabled={alertLoading}
                  key={`${button.text}-${index}`}
                  onPress={button.action}
                  style={({ pressed }) => [
                    styles.button,
                    verticalButtons ? styles.verticalButton : styles.horizontalButton,
                    buttonStyles[buttonStyle],
                    alertLoading && styles.disabledButton,
                    pressed && !alertLoading && styles.pressedButton,
                  ]}>
                  {button.needLoading && alertLoading ? (
                    <ActivityIndicator size="small" color={buttonTextColors[buttonStyle]} />
                  ) : (
                    <Text style={[styles.buttonText, { color: buttonTextColors[buttonStyle] }]}>
                      {button.text}
                    </Text>
                  )}
                </Pressable>
              );
            })}
          </View>
        </View>
      </View>
    </Modal>
  );
}

const buttonStyles = StyleSheet.create({
  default: { backgroundColor: Colors.active },
  cancel: {
    backgroundColor: Colors.softSurface,
    borderColor: Colors.softBorder,
    borderWidth: 1,
  },
  success: { backgroundColor: Colors.success },
  danger: { backgroundColor: Colors.danger },
});

const buttonTextColors = {
  default: Colors.background,
  cancel: Colors.active,
  success: Colors.background,
  danger: Colors.background,
} as const;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: Colors.overlay,
  },
  alertBox: {
    width: '100%',
    maxWidth: 420,
    alignItems: 'center',
    padding: 24,
    borderRadius: 20,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.border,
    backgroundColor: Colors.background,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  title: {
    marginBottom: 10,
    color: Colors.text,
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
  },
  message: {
    marginBottom: 20,
    color: Colors.secondaryText,
    fontSize: 16,
    lineHeight: 23,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    gap: 8,
  },
  verticalButtonContainer: {
    flexDirection: 'column',
  },
  button: {
    minHeight: 48,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
  },
  horizontalButton: {
    flex: 1,
  },
  verticalButton: {
    width: '100%',
  },
  buttonText: {
    color: Colors.background,
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
  },
  disabledButton: {
    backgroundColor: Colors.inactive,
  },
  pressedButton: {
    opacity: 0.8,
  },
});
