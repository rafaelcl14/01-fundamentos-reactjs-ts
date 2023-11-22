import { ThumbsUp, Trash } from '@phosphor-icons/react/dist/ssr';
import styles from './Comment.module.css';
import { Avatar } from './Avatar';
import { useState } from 'react';

interface CommentProps {
    content: string;
    ondeleteComment: (comment: string) => void;
}


export function Comment({ content , ondeleteComment}: CommentProps) {

    const [likeCount, setLikeCount] = useState(0);

    function handleLikeComment(){
       setLikeCount((state) => {
        return state + 1
       });
    }

    function haldleDeleteComment(){
        console.log('delete comment')

        ondeleteComment(content);
    }

    return (
        <div className={styles.comment}>
            <Avatar hasBorder={false} src="https://avatars.githubusercontent.com/u/39815593?v=4" alt=''/>

            <div className={styles.commentBox}>
                <div className={styles.commentContent}>
                    <header>
                        <div className={styles.authorAndTime}>
                            <strong>Rafael Carvalho</strong>
                            <time dateTime='2022-05-11 08:11:22'> Cerca de 1h atrás</time>
                        </div>
                        <button onClick={haldleDeleteComment} title='Deletar comentario'>
                            <Trash size={24}/>
                        </button>
                    </header>
                    <p>{content}</p>
                </div>
                <footer>
                    <button onClick={handleLikeComment} >
                        <ThumbsUp /> Aplaudir <span>{likeCount}</span>
                    </button>
                </footer>
            </div>
        </div>
    )
}