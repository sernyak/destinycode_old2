import re

with open("src/modules/stage-3-result/view.html", "r", encoding="utf-8") as f:
    s3_content = f.read()

# Extract the FAQ CSS block
faq_css_start = s3_content.find("/* FAQ */")
if faq_css_start != -1:
    faq_css_end = s3_content.find("/* Offer CTA Trust Line */", faq_css_start)
    if faq_css_end != -1:
        faq_css = s3_content[faq_css_start:faq_css_end]
        
        with open("src/modules/stage-1-welcome/index.js", "r", encoding="utf-8") as f:
            s1_content = f.read()
            
        style_creation_start = s1_content.find("const style = document.createElement('style');")
        if style_creation_start != -1:
            end_of_style_innerhtml = s1_content.find("`;", style_creation_start)
            if end_of_style_innerhtml != -1:
                # Append faq css inside `style.innerHTML = ...`
                new_s1_content = s1_content[:end_of_style_innerhtml] + "\n" + faq_css + "\n" + s1_content[end_of_style_innerhtml:]
                with open("src/modules/stage-1-welcome/index.js", "w", encoding="utf-8") as f:
                    f.write(new_s1_content)
                print("FAQ CSS explicitly appended to stage-1-welcome dynamic style block!")
            else:
                print("End of style.innerHTML not found")
        else:
            print("style element not found globally in Stage 1")
    else:
        print("End of FAQ CSS block in S3 not found")
else:
    print("Start of FAQ CSS block in S3 not found")
