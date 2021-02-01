find /usr/share/nginx/html/js/*.js | xargs sed -i "s/https:\/\/unip.zwjk.com/${BASE_URL}/g"
if [ $HEALTH_BASE_URL ]; then
  find /usr/share/nginx/html/js/*.js | xargs sed -i "s/https:\/\/health.tengmed.com/${HEALTH_BASE_URL}/g"
fi
if [ $THIRD_PART_URL ]; then
  find /usr/share/nginx/html/*.html | xargs sed -i "s/https:\/\/zjui.zwjk.com\/thirdParty/${THIRD_PART_URL}/g"
fi
nginx -g "daemon off;"