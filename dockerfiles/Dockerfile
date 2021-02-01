# 依赖的镜像
FROM nginx:alpine
RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
RUN echo 'Asia/Shanghai' >/etc/timezone
COPY dist /usr/share/nginx/html
COPY run.sh /run.sh
RUN chmod +x run.sh
CMD ["sh", "run.sh"]