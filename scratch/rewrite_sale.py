import re

with open("src/modules/stage-1-welcome/index.js", "r", encoding="utf-8") as f:
    text = f.read()

# I need to completely replace the logic where we append extraBlocksHTML for natal_chart_sale.
# Let's find the `if (variant.id === 'natal_chart_sale') {` block inside the builder.
start_idx = text.find("if (variant.id === 'natal_chart_sale') {")
end_idx = text.find("landingHTML += extraBlocksHTML;", start_idx)

if start_idx != -1 and end_idx != -1:
    print("Found injection point.")
else:
    print("Could not find injection point.")
