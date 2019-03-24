FROM node:10-alpine

# set maintainer
LABEL maintainer "agrajal7@eafit.edu.co"

# set a health check
HEALTHCHECK --interval=5s \
            --timeout=5s \
            CMD curl -f http://127.0.0.1:8000 || exit 1

# tell docker what port to expose
EXPOSE 8000

RUN mkdir -p /opt/app   
WORKDIR /opt/app
RUN cp -R ./* /opt/app
RUN npm install

WORKDIR /opt/app

ENTRYPOINT [ "node" ]
CMD [ "./app/index.js"]