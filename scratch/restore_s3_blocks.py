import re

with open("src/modules/stage-3-result/view.html", "r", encoding="utf-8") as f:
    s3 = f.read()

# We want the blocks:
# offer-block-science
# offer-block-transformation
# offer-block-delivery
# offer-block-reviews
# offer-block-guarantee
# offer-block-faq

start = s3.find('<!-- BLOCK 2: HOW IT WORKS — 4 Pillars (from Knowledge Base) -->')
end = s3.find('<!-- END: OFFER LANDING PAGE BLOCKS -->')

if start != -1 and end != -1:
    extracted_blocks = s3[start:end]
    # Remove style="display: none;" from them if present
    extracted_blocks = extracted_blocks.replace('style="display: none;"', '')

    with open("src/modules/stage-1-welcome/index.js", "r", encoding="utf-8") as f:
        s1 = f.read()

    # The current S1 has: 
    # <div id="offer-block-reviews" class="offer-landing-block" > ... </div>
    # <div id="premium-form-title-container" ...
    
    # Let's replace the custom `offer-block-reviews` that I wrote with ALL the blocks from S3!
    # Because S3 actually has its own `offer-block-reviews`!
    start_replace = s1.find('<div id="offer-block-reviews" class="offer-landing-block"')
    end_replace = s1.find('<div id="premium-form-title-container"', start_replace)

    if start_replace != -1 and end_replace != -1:
        new_s1 = s1[:start_replace] + extracted_blocks + "\n        " + s1[end_replace:]
        with open("src/modules/stage-1-welcome/index.js", "w", encoding="utf-8") as f:
            f.write(new_s1)
        print("Blocks restored perfectly!")
    else:
        print("S1 replacement boundaries not found.")
else:
    print("S3 boundaries not found.")
