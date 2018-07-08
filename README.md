# Statusy Widget

A super simple javascript application to add a nifty box to the corner of your
webpage to alert customers of potential service issues. 

## Screenshots

Collpased: 

![Collapsed](https://ptpb.pw/ff6h.png)

Expanded:

![Expanded](https://ptpb.pw/LMfV.png)

## Installation & Configuration

1. Include the `widget.js` script from the `src` directory on the page you want the app to appear on
2. Add a `div` with the `class` of `statusy`
3. Initialize the app like so: 

```
<script>
statusy({
  // config goes here, check below
});
</script>
```

Configuration options presently include:

* `statuspage` - This is the Statusy subdomain of the statuspage data should be pulled from, it _must_ be the Statusy subdomain, even if you are using a CNAME record.
* `statuspage_url` - This is the URL to your statuspage, feel free to provide a CNAME'd URL or whatever you want really.
