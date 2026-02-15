"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Crisp } from "crisp-sdk-web";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "react-hot-toast";
import { Tooltip } from "react-tooltip";
import config from "@/config";

// Crisp customer chat support
const CrispChat = () => {
  const pathname = usePathname();

  useEffect(() => {
    if (config?.crisp?.id) {
      Crisp.configure(config.crisp.id);

      if (
        config.crisp.onlyShowOnRoutes &&
        !config.crisp.onlyShowOnRoutes?.includes(pathname)
      ) {
        Crisp.chat.hide();
        Crisp.chat.onChatClosed(() => {
          Crisp.chat.hide();
        });
      }
    }
  }, [pathname]);

  return null;
};

// All the client wrappers are here (they can't be in server components)
// 1. ClerkProvider: Handles authentication (replaces NextAuth SessionProvider)
// 2. NextTopLoader: Show a progress bar at the top when navigating between pages
// 3. Toaster: Show Success/Error messages anywhere from the app with toast()
// 4. Tooltip: Show tooltips
// 5. CrispChat: Set Crisp customer chat support
const ClientLayout = ({ children }) => {
  return (
    <>
      <ClerkProvider
        appearance={{
          baseTheme: dark,
          variables: {
            colorPrimary: "#10b981",
            colorBackground: "#111827",
            colorInputBackground: "#1f2937",
            colorInputText: "#f3f4f6",
          },
        }}
      >
        {/* Show a progress bar at the top when navigating between pages */}
        <NextTopLoader color={config.colors.main} showSpinner={false} />

        {/* Content inside app/page.js files  */}
        {children}

        {/* Show Success/Error messages anywhere from the app with toast() */}
        <Toaster
          toastOptions={{
            duration: 3000,
          }}
        />

        {/* Show tooltips */}
        <Tooltip
          id="tooltip"
          className="z-[60] !opacity-100 max-w-sm shadow-lg"
        />

        {/* Set Crisp customer chat support */}
        <CrispChat />
      </ClerkProvider>
    </>
  );
};

export default ClientLayout;
