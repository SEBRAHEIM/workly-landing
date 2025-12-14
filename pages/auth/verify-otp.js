export async function getServerSideProps() {
  return {
    redirect: {
      destination: "/auth/login",
      permanent: false
    }
  };
}

export default function AuthVerifyRedirect() {
  return null;
}
