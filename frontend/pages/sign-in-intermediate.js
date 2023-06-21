import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

async function fetchData(email) {
	console.log();

	const response = await fetch(`${process.env.NEXT_PUBLIC_FRONTEND_ADAPTER_URL}/getUser/${email}`);

	const jsonData = await response.json();

	return jsonData;
}



export default function MyComponent() {
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
	}, [status, router]);


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
}
