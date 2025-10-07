#!/usr/bin/env bash
set -e

# Initialize Git
git init

# Create directories
mkdir -p app/onboarding app/\(auth\) app/\(student\) app/\(instructor\) app/\(admin\)
mkdir -p src/context src/components src/services src/hooks src/redux/slices src/utils
mkdir -p assets

# Add placeholder files (.gitkeep) in every empty folder
find app app/onboarding app/\(auth\) app/\(student\) app/\(instructor\) app/\(admin\) \
     src/context src/components src/services src/hooks src/redux/slices src/utils assets \
     -type d -exec touch {}/.gitkeep \;

# Create core files with minimal content

# app/_layout.jsx
cat > app/_layout.jsx << 'EOF'
import { Slot } from 'expo-router';
import { AuthProvider } from '../src/context/AuthContext';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';
import { store } from '../src/redux/store';

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Slot />
        </AuthProvider>
      </QueryClientProvider>
    </Provider>
  );
}
EOF

# app/index.jsx
cat > app/index.jsx << 'EOF'
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { useAuth } from '../src/context/AuthContext';

export default function Index() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      router.replace(user ? '/(student)/dashboard' : '/onboarding');
    }
  }, [user, isLoading]);

  return null;
}
EOF

# app/onboarding/_layout.jsx
cat > app/onboarding/_layout.jsx << 'EOF'
import { Stack } from 'expo-router';

export default function OnboardingLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="complete" />
    </Stack>
  );
}
EOF

# app/onboarding/index.jsx
cat > app/onboarding/index.jsx << 'EOF'
import { View, Text, Button } from 'react-native';
import { useRouter } from 'expo-router';

export default function OnboardingScreen() {
  const router = useRouter();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Welcome to ELearning App!</Text>
      <Button title="Get Started" onPress={() => router.push('/onboarding/complete')} />
    </View>
  );
}
EOF

# app/onboarding/complete.jsx
cat > app/onboarding/complete.jsx << 'EOF'
import { View, Text, Button } from 'react-native';
import { useAuth } from '../../src/context/AuthContext';

export default function Complete() {
  const { completeOnboarding } = useAuth();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>You're All Set!</Text>
      <Button title="Continue" onPress={completeOnboarding} />
    </View>
  );
}
EOF

# app/(auth)/_layout.jsx
cat > app/\(auth\)/_layout.jsx << 'EOF'
import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
    </Stack>
  );
}
EOF

# app/(auth)/login.jsx
cat > app/\(auth\)/login.jsx << 'EOF'
import { View, Text } from 'react-native';

export default function Login() {
  return <View><Text>Login Screen</Text></View>;
}
EOF

# app/(auth)/register.jsx
cat > app/\(auth\)/register.jsx << 'EOF'
import { View, Text } from 'react-native';

export default function Register() {
  return <View><Text>Register Screen</Text></View>;
}
EOF

# app/(student)/_layout.jsx
cat > app/\(student\)/_layout.jsx << 'EOF'
import { Tabs } from 'expo-router';

export default function StudentLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="dashboard" />
      <Tabs.Screen name="courses" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}
EOF

# app/(instructor)/_layout.jsx
cat > app/\(instructor\)/_layout.jsx << 'EOF'
import { Tabs } from 'expo-router';

export default function InstructorLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="dashboard" />
      <Tabs.Screen name="courses" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}
EOF

# app/(admin)/_layout.jsx
cat > app/\(admin\)/_layout.jsx << 'EOF'
import { Tabs } from 'expo-router';

export default function AdminLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="dashboard" />
      <Tabs.Screen name="users" />
      <Tabs.Screen name="courses" />
    </Tabs>
  );
}
EOF

# src/context/AuthContext.jsx
cat > src/context/AuthContext.jsx << 'EOF'
import React, { createContext, useContext, useState, useEffect } from 'react';
export const AuthContext = createContext({});
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // TODO: load auth state & onboarding flag
    setIsLoading(false);
  }, []);

  const completeOnboarding = () => setHasCompletedOnboarding(true);

  return (
    <AuthContext.Provider value={{ user, isLoading, hasCompletedOnboarding, completeOnboarding }}>
      {children}
    </AuthContext.Provider>
  );
}
EOF

# src/redux/store.js
cat > src/redux/store.js << 'EOF'
import { configureStore } from '@reduxjs/toolkit';
import wishlistReducer from './slices/wishlistSlice';

export const store = configureStore({
  reducer: { wishlist: wishlistReducer },
});
EOF

# src/redux/slices/wishlistSlice.js
cat > src/redux/slices/wishlistSlice.js << 'EOF'
import { createSlice } from '@reduxjs/toolkit';
const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: [],
  reducers: {
    add: (state, action) => { state.push(action.payload); },
    remove: (state, action) => state.filter(id => id !== action.payload),
  },
});
export const { add, remove } = wishlistSlice.actions;
export default wishlistSlice.reducer;
EOF

# src/hooks/useAuth.js
cat > src/hooks/useAuth.js << 'EOF'
export function useAuth() {
  // TODO: return auth context values
  return {};
}
EOF

# src/hooks/useCourses.js
cat > src/hooks/useCourses.js << 'EOF'
export function useCourses() {
  // TODO: implement React Query hook
  return {};
}
EOF

# src/services/authService.js
cat > src/services/authService.js << 'EOF'
export const login = async (credentials) => {
  // TODO: call login API
};
export const register = async (details) => {
  // TODO: call register API
};
EOF

# src/services/courseService.js
cat > src/services/courseService.js << 'EOF'
export const fetchCourses = async () => {
  // TODO: call fetch courses API
};
EOF

# src/services/storageService.js
cat > src/services/storageService.js << 'EOF'
import * as SecureStore from 'expo-secure-store';
export const saveToken = (token) => SecureStore.setItemAsync('authToken', token);
export const getToken = () => SecureStore.getItemAsync('authToken');
EOF

# src/components/ConfirmationModal.jsx
cat > src/components/ConfirmationModal.jsx << 'EOF'
import React from 'react';
import { Modal, View, Text, Button } from 'react-native';
export default function ConfirmationModal() {
  return null; // TODO: implement modal
}
EOF

# src/components/Pagination.jsx
cat > src/components/Pagination.jsx << 'EOF'
import React from 'react';
import { View, Button, Text } from 'react-native';
export default function Pagination() {
  return null; // TODO: implement pagination
}
EOF

# src/utils/constants.js
cat > src/utils/constants.js << 'EOF'
export const API_URL = 'https://api.example.com';
EOF

# src/utils/validation.js
cat > src/utils/validation.js << 'EOF'
import * as Yup from 'yup';
export const loginSchema = Yup.object({ email: Yup.string().email().required(), password: Yup.string().required() });
EOF

# Create README.md
cat > README.md << 'EOF'
# Elearning App

## Project Structure

\`\`\`
elearning-app/
├── app/
│   ├── _layout.jsx
│   ├── index.jsx
│   ├── onboarding/
│   ├── (auth)/
│   ├── (student)/
│   ├── (instructor)/
│   └── (admin)/
├── src/
│   ├── context/
│   ├── components/
│   ├── services/
│   ├── hooks/
│   ├── redux/
│   └── utils/
└── assets/
\`\`\`

## Getting Started

1. Install dependencies: \`npm install\`  
2. Start the app: \`npx expo start\`  

## Workflow

- Fork the repo and clone your fork.  
- Create feature branches: \`feature/{username}/{module}-{feature}\`.  
- Push to origin and open pull requests against \`main\`.  
EOF

# Create .github/CODEOWNERS
mkdir -p .github
cat > .github/CODEOWNERS << 'EOF'
/app/(auth)/*       @tasneem
/app/(student)/*    @hager
/app/(instructor)/* @yasmine
/app/(admin)/*      @makar
/src/components/*   @team-leads
/src/context/*      @tasneem
EOF
