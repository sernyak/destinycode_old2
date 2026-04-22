with open("src/modules/stage-3-result/view.html", "r", encoding="utf-8") as f:
    s3 = f.read()

start = s3.find("/* 🔥 OFFER LANDING BLOCKS STYLES")
end = s3.find("</style>", start)
if start != -1 and end != -1:
    extracted_css = s3[start:end]

    with open("src/modules/stage-1-welcome/index.js", "r", encoding="utf-8") as f:
        s1 = f.read()

    target = "/* 🌬️ \"Mystic Breath\" for Subtitle (used only if element exists) */"
    s1_index = s1.find(target)
    if s1_index != -1:
        new_s1 = s1[:s1_index] + extracted_css + "\n" + s1[s1_index:]
        with open("src/modules/stage-1-welcome/index.js", "w", encoding="utf-8") as f:
            f.write(new_s1)
        print("CSS completely injected into global-anim-styles!")
    else:
        print("target CSS insertion point not found in S1")
        
