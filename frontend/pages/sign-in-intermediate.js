// import { useSession } from "next-auth/react";
// import { useRouter } from "next/router";
// import { useEffect } from "react";

// export default function SignInIntermediate() {
// 	const { data: session, status } = useSession();
// 	const router = useRouter();

// 	if (status === "unauthenticated") {
// 		return false;
// 	}


// 	if (status === "authenticated") {
// 		return false;
// 	}

// 	useEffect(() => {
// 		fetchData();
// 	}, []);

// 	async function fetchData() {
// 		const response = await fetch(`http://localhost:3001/${session.user.email}`);

// 		const jsonData = await response.json();

// 		console.log(jsonData);
// 	}



// }

import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

async function fetchData(email) {
	const response = await fetch(`http://localhost:3001/getUser/${email}`);

	const jsonData = await response.json();

	return jsonData;
}

export default function MyComponent() {
	const router = useRouter();
	const { data: session, status } = useSession();

	useEffect(() => {
		async function handleAuthenticationLogicAndDataFetching() {
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
		}
		handleAuthenticationLogicAndDataFetching();
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
