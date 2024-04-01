import React from 'react'

function FadeRightComponent({children, className} : {children: React.ReactNode, className?: string}) {

    const [classNames, setClassNames] = React.useState('');
    const entryRef = React.useRef(null);

    React.useEffect(() => {
        const observer = new IntersectionObserver((entries) => 
        {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setClassNames('fade-slide-right');
                } else {
                    setClassNames('fade-slide-right-out');
                }
            });
        },
        {
            rootMargin: '-100px 0px -100px 0px',
        }
    );

        if (entryRef.current) {
            observer.observe(entryRef.current);
        }

        return () => {
            if (entryRef.current) {
                observer.unobserve(entryRef.current);
            }
        };
    }, []);

    return (
        <div ref={entryRef} className={`${className} ${classNames}`}>{children}</div>
    )
}

export default FadeRightComponent