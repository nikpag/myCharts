import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

async function fetchData(email) {
	const response = await fetch(`${process.env.NEXT_PUBLIC_URL_FRONTEND_ADAPTER}/getUser/${email}`);

	console.log("RESPONSE IS:", response);

	const jsonData = await response.json();

	return jsonData;
}

const SignInIntermediate = () => {
	const router = useRouter();

	const { data: session, status } = useSession();

	const useEffectFunction = async () => {
		if (status === "loading") {
			return;
		}

		if (status === "unauthenticated") {
			return;
		}

		const data = await fetchData(session.user.email);

		console.log(data);

		if (JSON.stringify(data) === "{}") {
			router.push("/new-user");
		}
		else {
			router.push("/account");
		}
	};

	useEffect(() => {
		useEffectFunction();
	}, [status]);


	if (status === "loading") {
		return <p>Loading...</p>;
	}

	if (status === "unauthenticated") {
		return <p>Unauthorized</p>;
	}

	return (
		<>
			<p>Content</p>
		</>
	);
};

export default SignInIntermediate;
