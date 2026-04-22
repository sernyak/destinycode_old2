import re

with open('src/modules/stage-3-result/view.html', 'r', encoding='utf-8') as f:
    html = f.read()

def get_block(start_id, end_id):
    try:
        start_idx = html.find(f'id="{start_id}"')
        if start_idx == -1: return ""
        start_tag = html.rfind('<', 0, start_idx)
        
        end_idx = html.find(end_id, start_tag)
        if end_idx == -1: return ""
        
        return html[start_tag:end_idx].replace('style="display: none;"', '').replace('style="display: none; margin-top: 16px;"', '').replace('`', '\\`')
    except Exception as e:
        return ""

science = get_block('offer-block-science', '<!-- BLOCK 3:')
structure = get_block('offer-block-transformation', '<!-- BLOCK 5:')
delivery = get_block('offer-block-delivery', '<!-- BLOCK 6:')
reviews = get_block('offer-block-reviews', '<!-- BLOCK 11:')
guarantee = get_block('offer-block-guarantee', '<!-- BLOCK 12:')
premium_form = get_block('premium-form-container', '<!-- ══════')

out = "landingHTML += `\\n" + science + "\n" + structure + "\n" + delivery + "\n" + reviews + "\n" + guarantee + "\n" + premium_form + "`;\\n"

with open('scratch/sale_blocks.txt', 'w', encoding='utf-8') as f:
    f.write(out)

print("Done")
