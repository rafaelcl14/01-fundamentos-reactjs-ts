import { format, formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { Avatar } from './Avatar';
import { Comment } from './Comment';
import styles from './Post.module.css';
import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface Author {
    name: string;
    role: string;
    avatar_Url: string;
}

interface Content {
    type: 'paragraph' | 'link';
    content: string;
}

export interface PostType{
    id: number;
    author: Author;
    publishedAt: Date;
    content: Content[];
}

interface PostProps {
    post: PostType;
}

export function Post({post}: PostProps){

    const [comments, setComments] = useState([
        'Ai que maravilha, ai que badalo, ai que tudo!!!!'
    ])

    const [newCommentText , setNewCommentText] = useState('');

    const publishedDateFormat = format(post.publishedAt, "d 'de' LLLL às HH:mm'h'", {locale:ptBR})

    const publishedDateRelativeToNow = formatDistanceToNow(post.publishedAt,{
        locale:ptBR,
        addSuffix: true

    })

    function handleCrateNewComment(event: FormEvent) {
        event.preventDefault()
        
        setComments([...comments, newCommentText]);

        setNewCommentText('')
    }

    function handelNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>){
        event.target.setCustomValidity('')
        setNewCommentText(event.target.value)
    }

    function deleteComment(commentToDelete: string){

        const commentWithoutDeletedOne = comments.filter(comment =>{
            return comment != commentToDelete;
        })

        setComments(commentWithoutDeletedOne); 
    }

    function handelNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>){
        event.target.setCustomValidity('Esse campo é Obrigatorio👌')
    }

    const isNewCommentEmpty = newCommentText.length === 0;

    return(
        <article className={styles.post}>
            <header>
                <div className={styles.author}>
                    <Avatar src={post.author.avatar_Url} />
                    <div className={styles.authorInfo}>
                        <strong>{post.author.name}</strong>
                        <span>{post.author.role}</span>
                    </div>
                </div>

                <time title={publishedDateFormat} dateTime={post.publishedAt.toISOString()}>
                    {publishedDateRelativeToNow}
                </time>
            </header>
            <div className={styles.content}>
                {post.content.map(line => {
                    if(line.type === 'paragraph'){
                        return <p key={line.content}>{line.content}</p>
                    }else if(line.type === 'link'){
                        return <p key={line.content}><a href="">{line.content}</a></p>
                    }
                })}                
            </div>
        <form onSubmit={handleCrateNewComment}  className={styles.commentForm}>
            <strong>Deixe seu feedback</strong>

            <textarea 
                name='comment'
                onChange={handelNewCommentChange}
                value={newCommentText}
                placeholder='Deixe um comentario'
                onInvalid={handelNewCommentInvalid}
                required
            />

            <footer>
                <button type='submit' disabled={isNewCommentEmpty}>Publicar</button>
            </footer>
        </form>

        <div className={styles.commentList}>
            {comments.map(comment =>{
                return (
                    <Comment 
                        key={comment} 
                        content={comment} 
                        ondeleteComment={deleteComment}
                    />
                )
            })}
        </div>
        </article>
    ) 
}
