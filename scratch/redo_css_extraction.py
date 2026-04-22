import re

with open("src/modules/stage-3-result/view.html", "r", encoding="utf-8") as f:
    s3_content = f.read()

# Extract from /* 🔥 OFFER LANDING BLOCKS STYLES to </style>
start_idx = s3_content.find("/* 🔥 OFFER LANDING BLOCKS STYLES")
end_idx = s3_content.find("</style>", start_idx)

if start_idx != -1 and end_idx != -1:
    extracted_css = s3_content[start_idx:end_idx]
    
    with open("src/modules/stage-1-welcome/index.js", "r", encoding="utf-8") as f:
        s1_content = f.read()
        
    s1_css_start = s1_content.find("/* 🔥 OFFER LANDING BLOCKS STYLES")
    # Finding the end of the injected style block:
    # Look for the JS string closure
    s1_css_end = s1_content.find("document.head.appendChild(style);", s1_css_start)
    
    if s1_css_start != -1 and s1_css_end != -1:
        # Find the last backtick before document.head
        last_backtick = s1_content.rfind("`;", s1_css_start, s1_css_end)
        if last_backtick != -1:
            # Replace the old css section with the fully extracted one
            new_s1_content = s1_content[:s1_css_start] + extracted_css + "\n" + s1_content[last_backtick:]
            with open("src/modules/stage-1-welcome/index.js", "w", encoding="utf-8") as f:
                f.write(new_s1_content)
            print("CSS replaced entirely!")
        else:
            print("Last backtick not found")
    else:
        print("CSS block not found in S1")
else:
    print("CSS block not found in S3")
