import requests
from breeds import domain

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

def get_breed_info(link: str) -> domain.BreedContent:
    try:
        resp = requests.get(link)
        return domain.BreedContent(content=resp.content, error=None)
    except requests.exceptions.RequestException as err:
        print(err) # log err here
        return domain.BreedContent(content=None, error=err)