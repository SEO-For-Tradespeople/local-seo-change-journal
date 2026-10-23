# Local SEO Change Journal

Local SEO Change Journal helps you keep a clear record of ongoing website and local-search work. Separate planned work, completed changes, checks and later observations in one readable report.

The journal records evidence supplied by its user. It does not prove that a change caused a ranking or enquiry increase. Maintained by [SEO for Tradespeople](https://seofortradespeople.co.uk/), operated by JW Digital Services Ltd.

![Complete example](docs/preview.png)

## Start locally

Requires Node.js 22 or later. No runtime dependencies or account required.

```sh
npm ci
npm test
npm run build
npm run serve
```

Open http://127.0.0.1:4173/ for the complete local demonstration. Browser examples do not upload or persist entered data. The optional development server binds to loopback only.

## Input and output

Supply business, asOf, changes [{id,date,url,change_type,reason,evidence_ref,owner,status,follow_up_date}] and observations [{source,period,value,note}]. status is planned/implemented/verified/rolled back. Verified needs check_ref. Observations never become causal claims.

Use [examples/input.json](examples/input.json) as the complete input contract. Compare the generated [JSON result](examples/output.json), [Markdown report](examples/output.md) and [complete HTML](examples/output.html). The demo is in [demo/index.html](demo/index.html). It needs the local server for JavaScript modules. HTML reports can be opened as standalone files.

```sh
node cli.mjs examples/input.json --format json
node cli.mjs examples/input.json --format html --output report.html
node cli.mjs examples/input.json --format md --output report.md
```

Flat collections can also be imported with `--csv data.csv --context context.json --key items` (replace `items` with the documented collection). Nested structures use JSON. See `node cli.mjs --help`.

## Worked example

Use a fictional plumbing firm's six-week journal: a corrected phone link, an approved service explanation, an unfinished profile-information review, a deployed change awaiting verification and a rollback. Include a synthetic traffic observation with a note that several other factors changed during the period. The generated report must not say that one action caused the traffic movement.

All supplied example records are synthetic. No clients, outcomes, current professional advice or real service availability are represented by them. Keep real records private and review output before sharing it.

## Checks

- Status changes follow the documented model. Verified work requires an actual check reference.
- Follow-up dates produce reminders, not false completion. Rollbacks remain visible in the chronology.
- Missing measurements remain missing; blank values never become zero or an improvement percentage.
- Observation labels preserve source and date range. Reports contain no automatic causal claims or ranking guarantees.
- Public examples and screenshots contain only synthetic data. Exports handle markup, formula-like fields and chronology safely.

The automated results and browser checks performed for this release are recorded in [verification.md](docs/verification.md). Manual screen-reader testing has not been performed. A passing automated check is not accessibility certification.

## Contribute and maintain

Use [Issues](https://github.com/SEO-For-Tradespeople/local-seo-change-journal/issues) for a reproducible bug and [Discussions](https://github.com/SEO-For-Tradespeople/local-seo-change-journal/discussions) for questions and improvements. Follow [CONTRIBUTING.md](CONTRIBUTING.md); report vulnerabilities privately using [SECURITY.md](SECURITY.md). See [CHANGELOG.md](CHANGELOG.md) for releases. Maintenance is best effort.

Code, original illustrations and synthetic fixtures are MIT licensed. There is no required website backlink when reusing the resource. Commercial brand assets and third-party material are not included.

## CSV example

```sh
node cli.mjs --csv examples/input.csv --context examples/context.json --key changes --format html --output csv-report.html
```

The context holds the root settings; the CSV holds the flat collection. Explicit booleans use `true` or `false`. Nested data uses JSON.
