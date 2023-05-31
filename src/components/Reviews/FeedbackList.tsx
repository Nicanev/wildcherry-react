import React from 'react';
import {Rating} from "./Rating";


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
};

const FeedbackList: React.FC<FeedbackListProps> = ({feedbackItems}) => {
    return (
        <div className="feedback-list">
            <h2>Отзывы о товаре</h2>
            <ul>
                {feedbackItems.map((item) => (
                    <li key={item.id}>
                        <div className="feedback-list-rating">
                            <Rating score={item.score}/>
                        </div>
                        <span className="feedback-list__user">{item.user.email} </span>
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                        <span>Дата: {new Date(item.createdAt).toLocaleString()}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FeedbackList;
