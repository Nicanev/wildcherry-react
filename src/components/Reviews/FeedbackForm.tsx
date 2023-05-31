import React, {useState} from 'react';

type FeedbackFormProps = {
  onSubmit: (title: string, description: string, score: string) => void;
};
const FeedbackForm: React.FC<FeedbackFormProps> = ({onSubmit}) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [score, setScore] = useState('1');

    const handleScoreChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setScore(event.target.value);
    };

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    const handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        onSubmit(title, description, score);
        setTitle('');
        setDescription('');
    };

    return (
        <form className="feedback__form" onSubmit={handleSubmit}>
            <div className="feedback__form-item">
                <label htmlFor="title">Заголовок:</label>
                <input type="text" id="title" value={title} onChange={handleTitleChange}/>
            </div>
            <div className="feedback__form-item">
                <label htmlFor="content">Описание:</label>
                <textarea id="content" value={description} onChange={handleContentChange}/>
            </div>
            <div className="feedback__form-item">
                <label htmlFor="score">Оценка:</label>
                <select id="score" value={score} onChange={handleScoreChange}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
            </div>
            <button type="submit">Отправить</button>
        </form>
    );
};

export default FeedbackForm;
