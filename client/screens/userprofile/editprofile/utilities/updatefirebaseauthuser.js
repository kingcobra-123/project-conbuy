import { getAuth, updateEmail, updatePassword, updateProfile } from "firebase/auth";

async function UpdateFirebaseAuthUser(displayName, newEmail, newPassword) {
    const auth = getAuth();
    const user = auth.currentUser;

    if (newEmail) {
        await updateEmail(user, newEmail).catch(error => {
            console.error("Failed to update email: ", error);
        });
    }

    if (displayName) {
        await updateProfile(user, { displayName: displayName }).catch(error => {
            console.error("Failed to update display name: ", error);
        });
    }

    

    if (newPassword) {
        await updatePassword(user, newPassword).catch(error => {
            console.error("Failed to update password: ", error);
        });
    }
}

export default UpdateFirebaseAuthUser;