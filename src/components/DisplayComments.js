/* eslint-disable prettier/prettier */
import React, { useContext } from 'react'
import styles from '../Style.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faReply, faEllipsisV } from '@fortawesome/free-solid-svg-icons'
import InputField from "./InputField"
import { ActionContext } from "./ActionContext"
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';


const CommentStructure = ({ i, reply, handleReply }) => {
    const actions = useContext(ActionContext)

    return (
        <div className={styles.halfDiv}>
            <div className={styles.userInfo} style={reply && { marginLeft: 15 }} >
                <div>{i.text}</div>
                <div className={styles.commentsTwo}>
                    <div>
                        <img
                            src={i.avatarUrl}
                            style={{ width: 20, height: 20, borderRadius: 20 / 2 }}
                            alt='userIcon'
                        />
                    </div>
                    <div className={styles.fullName}>{i.fullName} </div>
                    <div>
                        <button className={styles.replyBtn} onClick={() => handleReply(i.comId)}>
                            {' '}
                            <FontAwesomeIcon icon={faReply} size='1x' color='#a5a5a5' /> Reply
                     </button>
                    </div>
                </div>
            </div>
            <div className={styles.userActions}>
                {actions.userId === i.userId &&
                    <Popup
                        role="tooltip"
                        trigger={<button className={styles.actionsBtn}>
                            <FontAwesomeIcon icon={faEllipsisV} size='1x' color='#a5a5a5' />
                        </button>}
                        position="right center"
                    >
                        <ul className={styles.actionsDiv}>
                            <li> edit</li>
                            <li> delete</li>
                        </ul>
                    </Popup>
                }
            </div>
        </div>
    )
}

const DisplayComments = ({ comments }) => {

    const actions = useContext(ActionContext)
    return (
        <div >
            {comments.map((i, index) => (
                <div key={i.comId} >
                    <CommentStructure i={i} handleReply={actions.handleReply} />
                    {actions.replies.filter(id => id === i.comId).length !== 0
                        &&
                        <InputField cancellor={i.comId} parentId={i.comId} />
                    }
                    <div className={styles.replySection}>
                        {i.replies && i.replies.map((a, index) => (
                            <div key={a.comId} >
                                <CommentStructure i={a} reply handleReply={actions.handleReply} />
                                { actions.replies.filter(id => id === a.comId).length !== 0 &&
                                    <InputField cancellor={a.comId} parentId={i.comId} child />
                                }
                            </div>)
                        )}
                    </div>
                </div>
            ))}
        </div>
    )
}


export default DisplayComments