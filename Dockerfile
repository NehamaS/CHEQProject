FROM mcr.microsoft.com/playwright:v1.16.2-focal

COPY .  /CHEQProject
WORKDIR CHEQProject

# Install dependencies
RUN npm install
# Install browsers
RUN npx playwright install

# Run playwright test
CMD [ "npx", "playwright", "test" ]