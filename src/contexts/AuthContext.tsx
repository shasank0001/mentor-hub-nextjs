'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

type ExamType = "prelims" | "mains";

type PaymentStatus = Record<ExamType, boolean>;

type User = {
  id: string;
  email: string;
  name: string;
  examType: ExamType | null;
  paymentStatus: PaymentStatus;
};

type AuthContextValue = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  updatePaymentStatus: (examType: ExamType) => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const LOCAL_STORAGE_KEY = "user";

function persistUser(nextUser: User | null) {
  if (typeof window === "undefined") {
    return;
  }

  if (nextUser) {
    window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(nextUser));
  } else {
    window.localStorage.removeItem(LOCAL_STORAGE_KEY);
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window === "undefined") {
      return null;
    }

    const storedUser = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!storedUser) {
      return null;
    }

    try {
      return JSON.parse(storedUser) as User;
    } catch (error) {
      console.error("Failed to parse stored user", error);
      window.localStorage.removeItem(LOCAL_STORAGE_KEY);
      return null;
    }
  });

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const handleStorage = (event: StorageEvent) => {
      if (event.key !== LOCAL_STORAGE_KEY) {
        return;
      }

      if (!event.newValue) {
        setUser(null);
        return;
      }

      try {
        setUser(JSON.parse(event.newValue) as User);
      } catch (error) {
        console.error("Failed to parse stored user", error);
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const mockUser: User = {
      id: "1",
      email,
      name: email.split("@")[0] ?? email,
      examType: null,
      paymentStatus: {
        prelims: false,
        mains: false,
      },
    };

    setUser(mockUser);
    persistUser(mockUser);
  }, []);

  const signup = useCallback(async (email: string, password: string, name: string) => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const mockUser: User = {
      id: Math.random().toString(36).substring(2, 11),
      email,
      name,
      examType: null,
      paymentStatus: {
        prelims: false,
        mains: false,
      },
    };

    setUser(mockUser);
    persistUser(mockUser);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    persistUser(null);
  }, []);

  const updatePaymentStatus = useCallback((examType: ExamType) => {
    setUser((currentUser) => {
      if (!currentUser) {
        return currentUser;
      }

      const updatedUser: User = {
        ...currentUser,
        paymentStatus: {
          ...currentUser.paymentStatus,
          [examType]: true,
        },
      };

      persistUser(updatedUser);
      return updatedUser;
    });
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      login,
      signup,
      logout,
      updatePaymentStatus,
    }),
    [login, logout, signup, updatePaymentStatus, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
