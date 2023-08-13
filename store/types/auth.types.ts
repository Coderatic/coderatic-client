interface IUser {
	id: number;
	username: string;
	email: string;
	first_name: string;
	last_name: string;
	role: number;
}

interface IAuthState {
	user: IUser | null;
	isLoggedIn: boolean;
}

export { IUser, IAuthState };
