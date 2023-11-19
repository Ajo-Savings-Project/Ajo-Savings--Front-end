import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/react.svg";



const containerStyle: React.CSSProperties = {
	display: "flex",
	justifyContent: "center",
	width: "100%",
	height: "100vh",
};

const contentStyle: React.CSSProperties = {
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
};

function NotFoundPage() {
	return (
		<div style={containerStyle}>
			<div style={contentStyle}>
				<div style={{ margin: "100px 0 15px" }}>
					<img src={logo} width="190" height="auto" alt="Brand logo" />
				</div>
				<div style={{ fontSize: 80, fontWeight: "bold", opacity: 0.9 }}>
					404
				</div>
				<div
					style={{
						width: 500,
						textAlign: "center",
						fontSize: 16,
						opacity: 0.9,
					}}
				>
					Oops! Sorry, the page you're looking for doesn't exist. But don't
					worry, try going back to the previous page or visit the{" "}
					<Link to="/">homepage</Link>
				</div>
			</div>
		</div>
	);
}

export default NotFoundPage;
