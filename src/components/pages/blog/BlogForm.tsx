import React, { useEffect } from 'react'
import Editor from './Editor'
import { CiImageOff } from "react-icons/ci";
import { GetPost, PublishPost, UpdatePost } from '../../../services/BlogService';
import useAuthStore from '../../../stores/AuthStore';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

function BlogForm({ showForm, setShowForm }: { showForm: boolean, setShowForm: any }) {    

    const user = useAuthStore((state: any) => state.user);
    const [queryParameters] = useSearchParams()
    const [updating, setUpdating] = React.useState(false);
    const [post, setPost] = React.useState<Post>({
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
        const postId = queryParameters.get("edit");

        if(postId)
        {
            console.log(postId);
            setShowForm(true);
            fillFormData(postId);
            setUpdating(true);
        }
    }, []);

    useEffect(() => {
        const postId = queryParameters.get("edit");
        
        if(postId) return;

        const savedPost = localStorage.getItem("post");
        console.log(savedPost);
        if (savedPost && showForm) {
            setPost(JSON.parse(savedPost));
            return;
        }

        if(showForm)
        {
            setPost({
                blog_id: "",
                blog_author_id: "",
                blog_author_name: "",
                blog_title: "",
                blog_date: "",
                blog_text: "",
                blog_image: "",
                blog_tags: ["null"]
            });
        }
    }, [showForm]);

    async function fillFormData(postId: string) {
        const post = await GetPost(postId);

        if(!post) return;
        
        if (post) {
            console.log(post.data);
            setPost(post.data);
        }
    }

    const handlePhotoChange = () => {
        const fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.accept = "image/*";
        fileInput.click();

        fileInput.addEventListener("change", (e) => {
            const file = (e.target as HTMLInputElement).files?.item(0);

            if (!file) return;

            const reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onload = () => {
                setPost({ ...post, blog_image: reader.result as string, blog_author_id: "" });
            }
        })
    }

    const handlePublish = async(e: any) => {
        e.preventDefault();
        
        const response = await handleAction();
        console.log(response);
        if(response.data === 'ok')
        {
            queryParameters.delete("edit");
            toast.success("Post publicado correctamente");
            
            setPost({
                blog_id: "",
                blog_author_id: "",
                blog_author_name: "",
                blog_title: "",
                blog_date: "",
                blog_text: "",
                blog_image: "",
                blog_tags: ["null"]
            });

            setTimeout(() => {
                localStorage.removeItem("post");
            }, 1000);
            setShowForm(false);
        }
    }

    const handleAction = async() =>
    {
        console.log(post);
        if(updating)
        {
            const response = await UpdatePost(
                {
                    ...post,
                    blog_author_id: user.id,
                    blog_date: new Date().toLocaleDateString('en-GB')
                }, 
                user
            );

            return response;
        }

        const response = await PublishPost(
            {
                ...post,
                blog_author_id: user.id,
                blog_date: new Date().toLocaleDateString('en-GB')
            }, 
            user
        );

        return response;
    }

    const onPostChange = (post: Post) => {
        setPost(post);
        console.log(post);
        localStorage.setItem("post", JSON.stringify(post));
    }

    return (
        <div>
            <form action="" onSubmit={handlePublish}>
                <div className='flex flex-col md:flex-row justify-between items-center'>
                    <input 
                        type="text" 
                        placeholder='Nuevo post' 
                        className='w-full text-black placeholder-black text-4xl border-none p-0 py-5' 
                        onInput={(e: any) => onPostChange({ ...post, blog_title: e.target.value})}
                        value={post.blog_title}
                    />
                    <div className={`w-full md:w-64 cursor-pointer`} onClick={handlePhotoChange}>
                        {post.blog_image  ? <img className="rounded-xl" src={post.blog_image ? post.blog_image : "assets/user.png"} alt="" /> :
                            <div className="border border-dashed border-gray-600 rounded-xl p-5 aspect-video h-full flex items-center justify-center">
                                <CiImageOff size={56} className="m-auto" />
                            </div>
                        }
                    </div>
                </div>
                <div className='py-5'>
                    <Editor onPostChange={onPostChange} post={post} />
                </div>
                <div className='flex justify-end'>
                    <button className='base-gradient px-10 text-white' type="submit" >Publicar</button>
                </div>
            </form>
        </div>
    )
}

export default BlogForm