import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import HtmlRenderer from '../components/pages/blog/HtmlRenderer';
import { FaArrowLeft } from "react-icons/fa";
import NavigationManager from '../services/NavigationManager';
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { DeletePost, GetPost } from '../services/BlogService';
import useAuthStore from '../stores/AuthStore';
import { toast } from 'react-toastify';
import { useModal } from '../components/shared/PopupAlert';

function BlogPost() {

    const user = useAuthStore((state: any) => state.user);
    const {openModal} = useModal();

    const { id } : any = useParams();
    const [post, setPost] = useState<Post>({
        blog_id: "",
        blog_author_id: "",
        blog_author_name: "",
        blog_title: "",
        blog_date: "",
        blog_text: "",
        blog_image: "",
        blog_tags: ["null"]
    });

    useEffect(() => {
        GetCurrentPost();
    }, []);

    async function GetCurrentPost() {
        const post = await GetPost(id);

        if (!post) return;

        setPost(post.data);
    }

    async function HandlePostDelete(postId: string) {

        let confirm = await openModal("¡Atención!", "¿Estás seguro de que deseas eliminar esta publicación?");
    
        if(!confirm) return;

        const response = await DeletePost(postId, user);
        
        if(response.data === 'ok')
        {
            toast.success("Post eliminado correctamente");
            NavigationManager.navigateTo("/blog");
        }
    }

    return (
        <div className="py-32 pb-10 px-10 sm:px-10 md:px-20">
            <div className="py-0 sm:py-10">
                <h1>Blog Vitalit</h1>
                <FaArrowLeft className="text-purple-500 mt-10 text-2xl cursor-pointer" onClick={() => NavigationManager.navigateTo("/blog")} />
                <div className="">
                    <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center py-10">
                        <div>
                            <h2 className="text-purple-500 font-medium text-4xl">{post.blog_title}</h2>
                            <p><strong>Por</strong> {post.blog_author_name}</p>
                        </div>
                        <div className="flex items-center gap-5 pt-5 md:pt-0">
                            <span>{new Date(post.blog_date).toLocaleDateString('en-GB')}</span>
                            { user && user.id === post.blog_author_id &&
                                <div className='flex'>
                                    <MdEdit 
                                        className="text-purple-500 text-xl cursor-pointer"
                                        onClick={() => NavigationManager.navigateTo(`/blog`, "", { edit: post.blog_id })} 
                                    />
                                    <MdDelete
                                        className="text-purple-500 text-xl cursor-pointer"
                                        onClick={() => HandlePostDelete(post.blog_id)}
                                    />
                                </div>
                            }
                        </div>
                    </div>
                    <div className="py-5">
                        <img className="w-full aspect-video" src={post.blog_image} alt="" />
                    </div>
                    <div>
                        <HtmlRenderer htmlString={post.blog_text} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BlogPost