import GoogleLogin, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import { GOOGLE_AUTH_CLIENT_ID } from "../../const/const";

function GoogleButton() {
  const clientId = GOOGLE_AUTH_CLIENT_ID;

  return (
    <GoogleLogin
      clientId={clientId}
      buttonText="connect with google"
      onSuccess={(response: GoogleLoginResponse | GoogleLoginResponseOffline) =>
        console.log(response)
      }
    />
  );
}

export default GoogleButton;
