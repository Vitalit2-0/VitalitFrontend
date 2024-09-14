import { useEffect } from "react";

function HtmlRenderer({ htmlString } : { htmlString: string }) {
    
    useEffect(() => {
        document.querySelector('h2')?.classList.add('text-4xl', 'mb-4', 'text-purple-500', 'text-left', 'bg-purple-200', 'p-3', 'rounded-xl')
        document.querySelectorAll('h3')?.forEach(e => {
            e.classList.add('text-xl', 'font-bold', 'my-4', 'text-purple-500')
        })
        const a:any = document.querySelector('a[href="https://www.guidde.com"]');

        if(a) a.style.display = 'none';
    }, [htmlString])
    
    return (
      <div dangerouslySetInnerHTML={{ __html: htmlString }} className="font-light" />
    );
}

export default HtmlRenderer;