# SEO Enquiry Tracker & Monthly Planner

Record enquiries, quotes and jobs, compare a previous month and decide what to work on next.

**For trade businesses investing in ongoing SEO. No coding knowledge needed.**

[Open the free tool](https://seo-for-tradespeople.github.io/local-seo-change-journal/) · [See a fictional worked example](https://seo-for-tradespeople.github.io/local-seo-change-journal/examples/customer-output.html)

![Desktop preview](docs/preview.png)

## How to use it

1. Open the tool in your browser. No installation or account is needed.
2. Use your own business details in the labelled fields, or choose **Try a fictional example**.
3. Choose **Create my monthly review** and review the result.
4. Adjust your answers, then copy the result, download a text file or choose **Print / Save PDF**.

A simple monthly review you can save alongside your work records.

## What to expect

Use counts from the same source and time period. Track each enquiry once. This is a business record, not a claim that SEO caused the result.

Monthly counts can change for many reasons. This tool does not connect to analytics, identify an acquisition source or attribute results to SEO.

Your answers are processed in the browser tab. They are not uploaded, emailed or saved by the tool. Refreshing or closing the tab clears them. Save your result before leaving. GitHub provides hosting and handles normal request logs. Example details are fictional, not customer results.

## Design and maintenance

The interface uses the colours, typography and visual treatment of [SEO for Tradespeople](https://seofortradespeople.co.uk/). The tool is maintained by SEO for Tradespeople, operated by JW Digital Services Ltd. The commercial website is a separate project.

## For developers

The customer tool uses native HTML controls and small browser modules, with no runtime framework. Its planning or calculation rules are in `src/customer.js`; presentation helpers are in `src/customer-ui.js`.

```sh
npm ci --ignore-scripts
npm test
npm run build
npm run serve
```

Open the local address printed by the server. `npm run build:pages` prepares the static GitHub Pages artifact. Tests cover the customer rules and output escaping.

The original v0.1 developer helpers remain in `src/index.js` for compatibility, with their original examples. They are not needed to use the customer tool. The existing repository name and Pages URL are retained so earlier links keep working.

## Licence and feedback

MIT for tool code. Bundled typefaces retain their original licence notices in `demo/assets/font-licences`. [Ideas and feedback](https://github.com/SEO-For-Tradespeople/local-seo-change-journal/discussions/1).
