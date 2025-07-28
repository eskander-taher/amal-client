"use client";
import React, { useState, CSSProperties } from "react";

const styles: { [key: string]: CSSProperties } = {
	cardWrapper: {
		width: "100%",
		height: "100vh",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#000",
	},
	card: {
		width: "500px",
		height: "300px",
		position: "relative",
		backgroundColor: "#fff",
		borderRadius: "8px",
		overflow: "hidden",
		boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
		display: "flex",
		flexDirection: "column",
	},
	image: {
		width: "100%",
		height: "140px",
		objectFit: "cover",
	},
	content: {
		padding: "16px",
		flex: 1,
	},
	title: {
		fontSize: "20px",
		fontWeight: "bold",
		marginBottom: "8px",
	},
	description: {
		fontSize: "14px",
		color: "#555",
	},
	ctaContainer: {
		position: "absolute",
		bottom: 0,
		left: 0,
		width: "50px",
		height: "40px",
		backgroundColor: "yellow",
		borderTopRightRadius: "10px",
		transition: "width 0.3s ease-in-out",
		cursor: "pointer",
		overflow: "hidden",
	},
	ctaHover: {
		width: "120px",
	},
	ctaContent: {
		width: "100%",
		height: "100%",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		fontWeight: "bold",
	},
	pseudoAfter: {
		content: '""',
		width: "10px",
		height: "10px",
		background: "radial-gradient(circle at top right, transparent 70%, yellow 0%)",
		position: "absolute",
		top: 0,
		left: 0,
		transform: "translateY(-100%)",
	},
	pseudoBefore: {
		content: '""',
		width: "20px",
		height: "20px",
		background: "radial-gradient(circle at top right, transparent 70%, yellow 0%)",
		position: "absolute",
		right: 0,
		bottom: 0,
		transform: "translateX(100%)",
	},
};

const ShowCard: React.FC = () => {
	const [hovered, setHovered] = useState(false);

	return (
		<div style={styles.cardWrapper}>
			<div style={styles.card}>
				{/* Image */}
				<img
					src="https://via.placeholder.com/500x140"
					alt="Card Top"
					style={styles.image}
				/>

				{/* Content */}
				<div style={styles.content}>
					<div style={styles.title}>Card Title</div>
					<div style={styles.description}>
						This is a short description under the title. You can customize it as needed.
					</div>
				</div>

				{/* Show Tab */}
				<div
					style={{
						...styles.ctaContainer,
						...(hovered ? styles.ctaHover : {}),
					}}
					onMouseEnter={() => setHovered(true)}
					onMouseLeave={() => setHovered(false)}
				>
					<div style={styles.pseudoAfter}></div>
					<div style={styles.pseudoBefore}></div>
					<div style={styles.ctaContent}>
						<p>Show</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ShowCard;
