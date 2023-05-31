import React, {useEffect, useState} from 'react';
import FeedbackForm from './FeedbackForm';
import FeedbackList from './FeedbackList';
import axios from "axios";
import config from "../../config";
import "./Feedback.scss"
import parseJwt from "../../jwtUtils";
import {useNavigate} from "react-router-dom";

const Feedback: React.FC<{ productId: string }> = ({ productId }) => {
    const [isReviewAdded, setIsReviewAdded] = useState(false);
    const [feedbackItems, setFeedbackItems] = useState<any>([]);
    let navigate = useNavigate();

    useEffect(() => {
        fetchFeedbackItems();
    }, []);

    const fetchFeedbackItems = async () => {
        try {
            const response = await axios.get(`${config.apiUrl}/review`, {
                params: {
                    order: 'ASC',
                    page: 1,
                    take: 10,
                    product: productId,
                },
            });
            setFeedbackItems(response.data.reverse());
        } catch (error) {
            console.error('Ошибка при получении отзывов:', error);
        }
    };
    const handleSubmit = async (title: string, description: string, score: string) => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login')
        }
        const user = parseJwt(token)
        try {
            await axios.post(`${config.apiUrl}/review`, {
                title: title,
                description: description,
                score: Number(score),
                product: productId,
                user: user.id
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setIsReviewAdded(true);
            fetchFeedbackItems()
        } catch (error) {
            console.log(error)
        }
    };
     return (
    <div className="feedback">
      <h2>Отправить отзыв</h2>
      {isReviewAdded ? (
        <p>Отзыв успешно отправлен!</p>
      ) : (
        <FeedbackForm onSubmit={handleSubmit} />
      )}
      <FeedbackList feedbackItems={feedbackItems} />
    </div>
  );
};

export default Feedback;

