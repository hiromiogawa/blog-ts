import { memo, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { siteName, siteUrl } from '../../setting/setting';
import { useLocation } from 'react-router-dom';

type propsType = {
    title: string,
    ogtype: string
};

export const Head = memo((props: propsType) => {
    const { title, ogtype } = props;
    const { pathname } = useLocation();
    const [ path, setPath ] = useState<string>();
    const ogImgPath = `${siteUrl}/ogp.jpg`

    useEffect(() => {
        if (title) {
            document.title = title;
            window.gtag('config', 'G-GCE0NCNRNG', {
                'page_path': pathname
            });
        }
        setPath(`${siteUrl}${pathname}`);
    }, [title])

    return (
        <Helmet>
            <title>{title}</title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="description" content="ITの技術情報を中心とした、日々の記録をメモとして残すアウトプットブログです。"/>
            <meta property="og:title" content={title} />
            <meta property="og:description" content="ITの技術情報を中心とした、日々の記録をメモとして残すアウトプットブログです。" />
            <meta property="og:type" content={ogtype} />
            <meta property="og:url" content={path} />
            <meta property="og:image" content={ogImgPath}/>
            <meta property="og:site_name" content={siteName} />
            <meta property="og:locale" content="ja_JP"  />
        </Helmet>

    );
});

