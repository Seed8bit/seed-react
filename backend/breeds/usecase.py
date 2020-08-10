import requests

BREED_INFO_MAP = {
    "tomato": "https://vegetableswebsite.blob.core.windows.net/vegetablesinformation/tomato.md",
    "redpepper": "https://vegetableswebsite.blob.core.windows.net/vegetablesinformation/redpepper.md",
    "potato": "https://vegetableswebsite.blob.core.windows.net/vegetablesinformation/potato.md",
    "lettuce": "https://vegetableswebsite.blob.core.windows.net/vegetablesinformation/lettuce.md",
    "greenonion": "https://vegetableswebsite.blob.core.windows.net/vegetablesinformation/greenonion.md",
    "eggplant": "https://vegetableswebsite.blob.core.windows.net/vegetablesinformation/eggplant.md",
    "cucumber": "https://vegetableswebsite.blob.core.windows.net/vegetablesinformation/cucumber.md",
    "carrot": "https://vegetableswebsite.blob.core.windows.net/vegetablesinformation/carrot.md",
}

def get_breed_info_from_azure(vege_name: str):
    response = requests.get(BREED_INFO_MAP[vege_name])
    return response.content