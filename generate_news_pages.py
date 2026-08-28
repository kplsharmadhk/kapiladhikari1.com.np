import json
import html
import os
import re
from pathlib import Path


# ==========================================
# SETTINGS
# ==========================================

SITE_URL = "https://kapiladhikari1.com.np"

POSTS_FILE = Path("posts/posts.json")

OUTPUT_DIR = Path("news")

DEFAULT_IMAGE = "/images/hero.jpg"


# ==========================================
# LOAD POSTS
# ==========================================

if not POSTS_FILE.exists():
    raise FileNotFoundError(
        "posts/posts.json not found."
    )


with open(
    POSTS_FILE,
    "r",
    encoding="utf-8"
) as file:

    posts = json.load(file)


if not isinstance(posts, list):
    raise ValueError(
        "posts.json must contain an array."
    )


# ==========================================
# CREATE OUTPUT FOLDER
# ==========================================

OUTPUT_DIR.mkdir(
    parents=True,
    exist_ok=True
)


# ==========================================
# HELPERS
# ==========================================

def safe_text(value):

    if value is None:
        return ""

    return html.escape(
        str(value),
        quote=True
    )


def safe_filename(value):

    value = str(value)

    value = re.sub(
        r"[^a-zA-Z0-9_-]",
        "-",
        value
    )

    value = re.sub(
        r"-+",
        "-",
        value
    )

    return value.strip("-")


def absolute_image_url(image):

    if not image:
        return SITE_URL + DEFAULT_IMAGE

    image = str(image)

    # ../images/news2.jpg
    image = image.replace(
        "../",
        "/"
    )

    # images/news2.jpg
    if not image.startswith("/"):
        image = "/" + image

    return SITE_URL + image


def post_url(post_id):

    return (
        SITE_URL +
        "/news/" +
        safe_filename(post_id) +
        "/"
    )


# ==========================================
# GENERATE EACH NEWS PAGE
# ==========================================

generated_files = []


for post in posts:

    post_id = post.get("id")

    if post_id is None:
        continue


    title = (
        post.get("title")
        or "समाचार"
    )


    description = (
        post.get("seoDescription")
        or post.get("excerpt")
        or "विस्तृतमा समाचार पढ्नुहोस्।"
    )


    image_url = absolute_image_url(
        post.get("image")
    )


    url = post_url(
        post_id
    )


    folder_name = safe_filename(
        post_id
    )


    output_folder = (
        OUTPUT_DIR /
        folder_name
    )


    output_folder.mkdir(
        parents=True,
        exist_ok=True
    )


    output_file = (
        output_folder /
        "index.html"
    )


    # ======================================
    # CONTENT
    # ======================================

    content = post.get(
        "content",
        []
    )


    paragraphs = ""


    if isinstance(content, list):

        for paragraph in content:

            paragraphs += f"""
<p>
{safe_text(paragraph)}
</p>
"""


    elif content:

        paragraphs = f"""
<p>
{safe_text(content)}
</p>
"""


    # ======================================
    # HTML
    # ======================================

    page = f"""<!DOCTYPE html>
<html lang="ne">

<head>

<meta charset="UTF-8">

<meta name="viewport"
      content="width=device-width, initial-scale=1.0">


<title>
{safe_text(title)}
</title>


<meta name="description"
      content="{safe_text(description)}">


<meta name="author"
      content="{safe_text(post.get("author", "Kapil Adhikari"))}">


<meta name="robots"
      content="index, follow, max-image-preview:large">


<link rel="canonical"
      href="{safe_text(url)}">


<!-- =========================
     OPEN GRAPH
========================= -->

<meta property="og:type"
      content="article">


<meta property="og:site_name"
      content="Kapil Adhikari">


<meta property="og:locale"
      content="ne_NP">


<meta property="og:title"
      content="{safe_text(title)}">


<meta property="og:description"
      content="{safe_text(description)}">


<meta property="og:url"
      content="{safe_text(url)}">


<meta property="og:image"
      content="{safe_text(image_url)}">


<meta property="og:image:alt"
      content="{safe_text(title)}">


<meta property="og:image:width"
      content="1200">


<meta property="og:image:height"
      content="630">


<!-- =========================
     X / TWITTER
========================= -->

<meta name="twitter:card"
      content="summary_large_image">


<meta name="twitter:title"
      content="{safe_text(title)}">


<meta name="twitter:description"
      content="{safe_text(description)}">


<meta name="twitter:image"
      content="{safe_text(image_url)}">


<!-- =========================
     FONT
========================= -->

<link rel="preconnect"
      href="https://fonts.googleapis.com">


<link rel="preconnect"
      href="https://fonts.gstatic.com"
      crossorigin>


<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Noto+Sans+Devanagari:wght@400;500;600;700;800&display=swap"
      rel="stylesheet">


<style>

* {{
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}}

body {{
    background: #f7f5ef;
    color: #171717;

    font-family:
        "Noto Sans Devanagari",
        "DM Sans",
        sans-serif;

    line-height: 1.8;
}}

.header {{
    background: #111;
    color: #fff;
}}

.nav {{
    max-width: 1050px;
    min-height: 76px;
    margin: auto;
    padding: 0 22px;

    display: flex;
    align-items: center;
    justify-content: space-between;
}}

.brand {{
    color: #fff;
    text-decoration: none;

    display: flex;
    flex-direction: column;
    line-height: 1;
}}

.brand-name {{
    font-family: "DM Sans", sans-serif;
    font-size: 23px;
    font-weight: 800;
    letter-spacing: 2px;
}}

.brand-sub {{
    font-size: 10px;
    letter-spacing: 4px;
    opacity: .65;
    margin-top: 5px;
}}

.back {{
    color: #fff;
    text-decoration: none;

    border: 1px solid rgba(255,255,255,.3);
    border-radius: 30px;

    padding: 8px 15px;

    font-size: 12px;
}}

.article {{
    max-width: 900px;
    margin: auto;

    padding:
        60px 22px
        90px;
}}

.category {{
    color: #d02023;

    font-family:
        "DM Sans",
        sans-serif;

    font-size: 12px;
    font-weight: 800;

    letter-spacing: 1.5px;

    margin-bottom: 15px;
}}

h1 {{
    font-size:
        clamp(34px, 6vw, 64px);

    line-height: 1.25;

    font-weight: 800;
}}

.meta {{
    margin-top: 18px;
    padding-bottom: 24px;

    border-bottom: 1px solid #ddd;

    color: #777;

    font-size: 12px;

    display: flex;
    gap: 18px;
    flex-wrap: wrap;
}}

.hero-image {{
    margin-top: 30px;
}}

.hero-image img {{
    width: 100%;
    height: auto;
    display: block;
}}

.read {{
    margin-top: 25px;

    padding: 16px 18px;

    background: #fff;

    border-left:
        4px solid #d02023;

    font-weight: 700;
}}

.content {{
    margin-top: 30px;
}}

.content p {{
    font-size: 17px;
    line-height: 2;

    margin-bottom: 22px;
}}

.share {{
    margin-top: 45px;

    padding-top: 25px;

    border-top: 1px solid #ddd;
}}

.share-title {{
    font-weight: 700;
    margin-bottom: 12px;
}}

.share a {{
    display: inline-block;

    margin-right: 7px;

    padding: 8px 14px;

    border:
        1px solid #ccc;

    border-radius: 25px;

    background: #fff;

    font-size: 12px;

    text-decoration: none;

    color: #171717;
}}

.footer {{
    background: #111;
    color: #fff;

    padding: 35px 22px;
}}

.footer-inner {{
    max-width: 1050px;
    margin: auto;

    display: flex;
    justify-content: space-between;
    gap: 20px;
}}

.footer-name {{
    font-weight: 800;
    letter-spacing: 2px;
}}

.footer-info,
.copy {{
    color: #888;
    font-size: 12px;
}}

@media(max-width:600px) {{

    .nav {{
        min-height: 68px;
        padding: 0 16px;
    }}

    .brand-name {{
        font-size: 20px;
    }}

    .article {{
        padding:
            45px 17px
            70px;
    }}

    h1 {{
        font-size: 34px;
    }}

    .content p {{
        font-size: 16px;
    }}

    .footer-inner {{
        flex-direction: column;
    }}

}}

</style>

</head>


<body>


<header class="header">

<div class="nav">

<a
href="/"
class="brand">

<span class="brand-name">
KAPIL
</span>

<span class="brand-sub">
ADHIKARI
</span>

</a>


<a
href="/news.html"
class="back">

← समाचारहरू

</a>

</div>

</header>


<main>

<article class="article">


<div class="category">

{safe_text(post.get("categoryName", "समाचार"))}

</div>


<h1>

{safe_text(title)}

</h1>


<div class="meta">

<span>
{safe_text(post.get("date", ""))}
</span>

<span>
{safe_text(post.get("author", "Kapil Adhikari"))}
</span>

</div>


<div class="hero-image">

<img
src="{safe_text(image_url)}"
alt="{safe_text(title)}"
>

</div>


<div class="read">

विस्तृतमा समाचार पढ्नुहोस्।

</div>


<div class="content">

{paragraphs}

</div>


<div class="share">

<div class="share-title">

यो समाचार share गर्नुहोस्

</div>


<a
href="https://www.facebook.com/sharer/sharer.php?u={safe_text(url)}"
target="_blank"
rel="noopener">

Facebook

</a>


<a
href="https://twitter.com/intent/tweet?url={safe_text(url)}&text={safe_text(title)}"
target="_blank"
rel="noopener">

X

</a>

</div>


</article>

</main>


<footer class="footer">

<div class="footer-inner">

<div>

<div class="footer-name">

KAPIL ADHIKARI

</div>

<div class="footer-info">

News • Stories • Nepal

</div>

</div>


<div class="copy">

© Kapil Adhikari

</div>

</div>

</footer>


</body>

</html>
"""


    # ======================================
    # WRITE FILE
    # ======================================

    with open(
        output_file,
        "w",
        encoding="utf-8"
    ) as file:

        file.write(page)


    generated_files.append(
        str(output_file)
    )


# ==========================================
# RESULT
# ==========================================

print(
    f"Generated {len(generated_files)} news pages."
)

for filename in generated_files:

    print(
        f"Created: {filename}"
    )
