import {
  createContext,
  useCallback,
  useContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from 'react';

export type ToastType = 'default' | 'success' | 'warning' | 'danger';
export type AlertButtonStyle = 'default' | 'cancel' | 'success' | 'danger';

export type AlertButton = {
  text: string;
  action: () => void;
  style?: AlertButtonStyle;
  needLoading?: boolean;
};

type FeedbackContextValue = {
  toastVisible: boolean;
  toastTitle: string;
  toastMessage: string;
  toastType: ToastType;
  toastIcon: string | null;
  showToast: (title: string, message: string, type?: ToastType, icon?: string | null) => void;
  hideToast: () => void;
  alertVisible: boolean;
  alertTitle: string;
  alertMessage: string;
  alertButtons: AlertButton[];
  alertLoading: boolean;
  verticalButtons: boolean;
  setVerticalButtons: Dispatch<SetStateAction<boolean>>;
  setAlertTitle: Dispatch<SetStateAction<string>>;
  setAlertMessage: Dispatch<SetStateAction<string>>;
  setAlertVisible: Dispatch<SetStateAction<boolean>>;
  setAlertLoading: Dispatch<SetStateAction<boolean>>;
  addAlertButton: (button: AlertButton) => void;
  showAlert: (title: string, message: string, buttons?: AlertButton[], verticalButtons?: boolean) => void;
  hideAlert: () => void;
};

const FeedbackContext = createContext<FeedbackContextValue | undefined>(undefined);

export function FeedbackProvider({ children }: { children: ReactNode }) {
  const [toastVisible, setToastVisible] = useState(false);
  const [toastTitle, setToastTitle] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<ToastType>('default');
  const [toastIcon, setToastIcon] = useState<string | null>(null);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertButtons, setAlertButtons] = useState<AlertButton[]>([]);
  const [alertLoading, setAlertLoading] = useState(false);
  const [verticalButtons, setVerticalButtons] = useState(false);

  const showToast: FeedbackContextValue['showToast'] = useCallback(
    (title, message, type = 'default', icon = null) => {
      setToastTitle(title);
      setToastMessage(message);
      setToastType(type);
      setToastIcon(icon);
      setToastVisible(true);
    },
    [],
  );

  const hideToast = useCallback(() => {
    setToastVisible(false);
    setToastMessage('');
    setToastTitle('');
    setToastType('default');
    setToastIcon(null);
  }, []);

  const addAlertButton = useCallback((button: AlertButton) => {
    setAlertButtons((previousButtons) => [...previousButtons, button]);
  }, []);

  const showAlert: FeedbackContextValue['showAlert'] = useCallback(
    (title, message, buttons = [], useVerticalButtons = false) => {
      setAlertTitle(title);
      setAlertMessage(message);
      setAlertButtons(buttons);
      setAlertLoading(false);
      setVerticalButtons(useVerticalButtons);
      setAlertVisible(true);
    },
    [],
  );

  const hideAlert = useCallback(() => {
    setAlertVisible(false);
    setAlertTitle('');
    setAlertMessage('');
    setAlertButtons([]);
    setAlertLoading(false);
    setVerticalButtons(false);
  }, []);

  return (
    <FeedbackContext.Provider
      value={{
        toastVisible,
        toastTitle,
        toastMessage,
        toastType,
        toastIcon,
        showToast,
        hideToast,
        alertVisible,
        alertTitle,
        alertMessage,
        alertButtons,
        alertLoading,
        verticalButtons,
        setVerticalButtons,
        setAlertTitle,
        setAlertMessage,
        setAlertVisible,
        setAlertLoading,
        addAlertButton,
        showAlert,
        hideAlert,
      }}>
      {children}
    </FeedbackContext.Provider>
  );
}

export function useFeedback() {
  const context = useContext(FeedbackContext);
  if (!context) {
    throw new Error('useFeedback must be used within a FeedbackProvider.');
  }
  return context;
}