# Garden Backend
Frontend is built with [FastAPI](https://fastapi.tiangolo.com/)

### Development

*Prequest*: python 3.6+

```
# under backend folder
pip3 install -r requirements.txt
python3 main.py
```

Check localhost:5000 to see if backend up running.

#### Virtual Env
A virtualenv could be setup as well for a clean isolated running environment for this project.

- init: run `virtualenv -p python3.8.5 garden_env` then a `garden_env` folder should appear once init done

- activate: run `source garden_env/bin/activate` will launch the virtual env

- deactivate: run `deactivate` will terminate the virtual env

Remember to install dependencies at the first time of launching the virtual env since it won't contain the packages installed in the system.


### API doc
FastAPI provides auto-generated API document at endpoint `/docs`.
