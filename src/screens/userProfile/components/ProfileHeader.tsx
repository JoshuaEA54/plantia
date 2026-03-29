import { Ionicons } from "@expo/vector-icons";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { UserProfileData } from "@/src/types-dtos/user.types";
import { useProfileHeaderTheme } from "./ProfileHeader.styles";

interface ProfileHeaderProps {
  user: UserProfileData;
  topInset: number;
  onEditPress?: () => void;
}

export default function ProfileHeader({
  user,
  topInset,
  onEditPress,
}: ProfileHeaderProps) {
  const { theme, styles } = useProfileHeaderTheme();

  return (
    <View style={[styles.header, { paddingTop: topInset + 12 }]}>
      <TouchableOpacity style={styles.settingsButton} onPress={onEditPress}>
        <Ionicons name="pencil" size={18} color={theme.colors.primary} />
      </TouchableOpacity>

      {/* Avatar */}
      <View style={styles.avatarWrapper}>
        <View style={styles.avatarBorder}>
          <Image source={{ uri: user.avatarUrl }} style={styles.avatar} />
        </View>
        <TouchableOpacity
          style={styles.editAvatarButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="camera" size={18} color={theme.colors.primary} />
        </TouchableOpacity>
      </View>

      <Text style={styles.userName}>{user.name}</Text>
      <Text style={styles.userHandle}>@{user.handle}</Text>
      <Text style={styles.userBio}>{user.bio}</Text>

      <View style={styles.birthdateRow}>
        <Ionicons
          name="calendar-outline"
          size={12}
          color="rgba(255,255,255,0.7)"
        />
        <Text style={styles.birthdateText}>{user.birthdate}</Text>
      </View>
    </View>
  );
}
