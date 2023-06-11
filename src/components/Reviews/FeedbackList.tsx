import React from "react";
import { Rating } from "./Rating";
import parseJwt from "../../jwtUtils";

type FeedbackItem = {
	id: number;
	title: string;
	description: string;
	user: any;
	score: any;
	createdAt: any;
};

type FeedbackListProps = {
	feedbackItems: FeedbackItem[];
	onDeleteFeedback: (feedbackId: number) => void;
};

const FeedbackList: React.FC<FeedbackListProps> = ({
	feedbackItems,
	onDeleteFeedback,
}) => {
	let user: any = null;
	if (localStorage.getItem("token")) {
		user = parseJwt(localStorage.getItem("token"));
	}

	const handleDeleteFeedback = async (feedbackId: number) => {
		onDeleteFeedback(feedbackId);
	};
	return (
		<div className="feedback-list">
			<h2>Отзывы о товаре</h2>
			<ul>
				{feedbackItems.map((item) => (
					<li key={item.id}>
						<div className="feedback__content">
							<div className="feedback-list-rating">
								<Rating score={item.score} />
							</div>
							<span className="feedback-list__user">{item.user.email} </span>
							<h3>{item.title}</h3>
							<p>{item.description}</p>
							<span>Дата: {new Date(item.createdAt).toLocaleString()}</span>
						</div>
						{user &&
							item.user.id === user.id && (
								<button onClick={() => handleDeleteFeedback(item.id)}>
									Удалить
								</button>
							)}
					</li>
				))}
			</ul>
		</div>
	);
};
export default FeedbackList;
