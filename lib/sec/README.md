# SEC Import Layer

Future SEC code belongs here:

- `edgar-client.ts` for filing discovery and accession metadata.
- `form13f-parser.ts` for 13F information tables.
- `form4-parser.ts` for insider transaction forms.

Keep network code isolated from UI components. Pages should call repository functions, not SEC clients directly.
