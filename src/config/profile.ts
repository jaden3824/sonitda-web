export const profileImageConfig = {
  defaultSrc: "/images/profiles/default-profile.png",
  maxSizeBytes: 5 * 1024 * 1024,
  acceptedTypes: [
    "image/jpeg",
    "image/png",
    "image/webp",
  ],
  accept: "image/jpeg,image/png,image/webp",
} as const;
