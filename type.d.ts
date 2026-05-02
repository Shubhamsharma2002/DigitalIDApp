import type { ImageSourcePropType } from "react-native";

declare global {
  // Navigation Tabs ke liye (Home, Wallet, Scanner, Settings)
  interface AppTab {
    name: string;
    title: string;
    icon: ImageSourcePropType;
  }

  interface TabIconProps {
    focused: boolean;
    icon: ImageSourcePropType;
  }

  // --- Digital ID Specific Interfaces ---

  // Main Identity Card ya Document ke liye
  interface DigitalDocument {
    id: string;
    type: "Aadhaar" | "PAN" | "Driving_License" | "Voter_ID" | "Other"; // Document category
    icon: ImageSourcePropType;
    docName: string; // e.g., "Shubham's Aadhaar"
    docNumber: string; // Masked number like XXXX-XXXX-1234
    issuedBy: string; // e.g., "UIDAI"
    expiryDate?: string;
    verificationStatus: "verified" | "pending" | "expired";
    color?: string; // Card ka background color/gradient
    data?: any; // Extra fields jo QR scan se aayein
  }

  // UI Card Component ke props
  interface DocumentCardProps extends Omit<DigitalDocument, "id"> {
    isExpanded: boolean;
    onPress: () => void;
    onShare?: () => void;
    onDelete?: () => void;
  }

  // Verification Activity (Hali filhal mein scan kiye gaye IDs)
  interface RecentActivity {
    id: string;
    action: "scanned" | "shared" | "verified";
    docType: string;
    timestamp: string;
    location?: string;
  }

  interface ListHeadingProps {
    title: string;
    showSeeAll?: boolean;
    onSeeAllPress?: () => void;
  }
}

export { };

