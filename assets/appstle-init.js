(function (window, k) {
  if (!window.AppstleIncluded && (!urlIsProductPage() || 'V1' === 'V2')) {
    window.AppstleIncluded = true;
    appstleLoadScript = function (src, callback) {
      var script = document.createElement('script');
      script.charset = 'utf-8';
      script.defer = true;
      script.src = src;
      script.onload = script.onreadystatechange = function () {
        if (!script.readyState || /loaded|complete/.test(script.readyState)) {
          script.onload = script.onreadystatechange = null;
          script = k;
          callback && callback();
        }
      };
      document.getElementsByTagName('body')[0].appendChild(script);
    };

    appstleLoadScript(
      'https://cdn.shopify.com/s/files/1/0714/4275/9975/t/3/assets/appstle-subscription.js?v=1690967013',
    );

    window.RS = Window.RS || {};
    RS.Config = {
      selectors: {
        payment_button_selectors:
          "form[action$='/cart/add'] .shopify-payment-button",
        subscriptionLinkSelector: '',
        atcButtonPlacement: 'BEFORE',
        subscriptionLinkPlacement: 'BEFORE',
        cartRowSelector: '',
        cartLineItemSelector: '',
        cartLineItemPerQuantityPriceSelector: '',
        cartLineItemTotalPriceSelector: '',
        cartLineItemSellingPlanNameSelector: '',
        cartSubTotalSelector: '',
        cartLineItemPriceSelector: '',
      },
      enableCartWidgetFeature: 'false',
      useUrlWithCustomerId: 'true',
      atcButtonSelector: '',
      moneyFormat: '{% raw %}\u20AC{{amount_with_comma_separator}}{% endraw %}',
      oneTimePurchaseText: 'One Time Purchase',
      shop: 'chrometheme-dev.myshopify.com',
      deliveryText: 'delivery',
      purchaseOptionsText: 'Purchase Options',
      manageSubscriptionButtonText: 'Manage Subscription',
      subscriptionOptionText: 'Subscribe and save',
      sellingPlanSelectTitle: 'DELIVERY FREQUENCY',
      subscriptionPriceDisplayText: '',
      tooltipTitle: 'Subscription detail',
      showTooltipOnClick: 'false',
      tooltipDesctiption:
        '<strong>Have complete control of your subscriptions</strong><br/><br/>Skip, reschedule, edit, or cancel deliveries anytime, based on your needs.',
      tooltipDescriptionOnPrepaidPlan:
        '<b>Prepaid Plan Details</b></br> Total price: {{totalPrice}} ( Price for every delivery: {{pricePerDelivery}})',
      tooltipDescriptionOnMultipleDiscount:
        '<b>Discount Details</b></br> Initial discount is {{discountOne}} and then {{discountTwo}}',
      tooltipDescriptionCustomization:
        '{{{defaultTooltipDescription}}} </br>  {{{prepaidDetails}}} </br> {{{discountDetails}}}',
      orderStatusManageSubscriptionTitle: 'Subscription',
      orderStatusManageSubscriptionDescription:
        'Continue to your account to view and manage your subscriptions. Please use the same email address that you used to buy the subscription.',
      orderStatusManageSubscriptionButtonText: 'Manage your subscription',
      subscriptionOptionSelectedByDefault: false,
      totalPricePerDeliveryText: '{{prepaidPerDeliveryPrice}}/delivery',
      memberOnlySellingPlansJson: {},
      nonMemberOnlySellingPlansJson: {},
      sellingPlansJson: [
        {
          frequencyCount: 1,
          frequencyInterval: 'MONTH',
          billingFrequencyCount: 1,
          billingFrequencyInterval: 'MONTH',
          frequencyName: 'Monatlich',
          frequencyDescription: '',
          discountOffer: 10.0,
          afterCycle1: 0,
          discountType: 'PERCENTAGE',
          discountEnabled: true,
          discountEnabledMasked: true,
          id: 'gid://shopify/SellingPlan/689522049319',
          frequencyType: 'ON_PURCHASE_DAY',
          specificDayEnabled: false,
          cutOff: 0,
          prepaidFlag: 'false',
          idNew: 'gid://shopify/SellingPlan/689522049319',
          planType: 'PAY_AS_YOU_GO',
          deliveryPolicyPreAnchorBehavior: 'ASAP',
          freeTrialEnabled: false,
          memberOnly: false,
          nonMemberOnly: false,
          frequencySequence: 0,
          groupName: 'Monatlich',
          appstleCycles: [],
        },
        {
          frequencyCount: 1,
          frequencyInterval: 'MONTH',
          billingFrequencyCount: 1,
          billingFrequencyInterval: 'MONTH',
          frequencyName: 'Monthly',
          frequencyDescription: 'Monthly',
          discountOffer: 10.0,
          afterCycle1: 0,
          discountType: 'PERCENTAGE',
          discountEnabled: true,
          discountEnabledMasked: true,
          id: 'gid://shopify/SellingPlan/689522082087',
          frequencyType: 'ON_PURCHASE_DAY',
          specificDayEnabled: false,
          cutOff: 0,
          prepaidFlag: 'false',
          idNew: 'gid://shopify/SellingPlan/689522082087',
          planType: 'PAY_AS_YOU_GO',
          deliveryPolicyPreAnchorBehavior: 'ASAP',
          freeTrialEnabled: false,
          memberOnly: false,
          nonMemberOnly: false,
          frequencySequence: 0,
          groupName: 'Monthly',
          appstleCycles: [],
        },
      ],
      widgetEnabled: true,
      showTooltip: true,
      sortByDefaultSequence: false,
      showSubOptionBeforeOneTime: false,
      showStaticTooltip: false,
      showAppstleLink: true,
      sellingPlanTitleText:
        '{{sellingPlanName}} ({{sellingPlanPrice}}/delivery)',
      oneTimePriceText: '{{price}}',
      selectedPayAsYouGoSellingPlanPriceText: '{{price}}',
      selectedPrepaidSellingPlanPriceText: ' {{totalPrice}}',
      selectedDiscountFormat: 'SAVE {{selectedDiscountPercentage}}',
      manageSubscriptionBtnFormat:
        "<a href='apps/subscriptions' class='appstle_manageSubBtn' ><button class='btn' style='padding: 2px 20px'>Manage Subscription</button><a><br><br>",
      manageSubscriptionUrl: 'apps/subscriptions',
      appstlePlanId: 163,
      showCheckoutSubscriptionBtn: true,
      disableLoadingJquery: false,
      widgetEnabledOnSoldVariant: 'false',
      switchRadioButtonWidget: true,
      appstlePlanName: 'BUSINESS',
      appstlePlanFeatures: {
        accessAdvancedCustomerPortalSettings: true,
        accessAdvanceSubscriptionPlanOptions: true,
        accessAppstleMenu: true,
        accessBuildABox: true,
        accessBundling: true,
        accessDiscountOnCancellationAttempt: true,
        accessGorgiasIntegration: true,
        accessKlaviyoContactSync: true,
        accessKlaviyoEmailIntegration: true,
        accessManualSubscriptionCreation: true,
        accessMechanicsIntegration: true,
        accessOneTimeProductUpsells: true,
        accessQuickCheckout: false,
        accessResendEmail: true,
        accessShopifyFlowIntegration: true,
        accessSplitContract: true,
        accessSubscriberLoyaltyFeatures: true,
        accessSubscriptionActivityLogs: true,
        accessWidgetDesignOptions: true,
        accessZapierIntegration: true,
        analytics: true,
        enableAdvancedSellingPlans: true,
        enableAutomation: false,
        enableAutoSync: false,
        enableBundling: true,
        enableCancellationManagement: true,
        enableCartWidget: true,
        enableCustomEmailDomain: true,
        enableCustomEmailHtml: true,
        enableCustomerPortalSettings: true,
        enableDunningManagement: true,
        enableExternalApi: false,
        enableIntegrations: true,
        enableProductSwapAutomation: true,
        enableQuickActions: true,
        enableShippingProfiles: true,
        enableSmsAlert: true,
        enableSubscriptionManagement: true,
        enableSummaryReports: true,
        enableWidgetPlacement: true,
        subscriptionOrderAmount: 30000,
        webhookAccess: false,
        enableExportActivityLog: false,
      },
      formMappingAttributeName: '',
      formMappingAttributeSelector: '',
      quickViewModalPollingSelector: '',
      scriptLoadDelay: '0',
      formatMoneyOverride: 'false',
      appstle_app_proxy_path_prefix: 'apps/subscriptions',
      updatePriceOnQuantityChange: '',
      widgetParentSelector: '',
      quantitySelector: '',
      enableAddJSInterceptor: 'false',
      reBuyEnabled: 'false',
      loyaltyDetailsLabelText: '',
      loyaltyPerkDescriptionText: '',
      widgetType: 'WIDGET_TYPE_1',
      widgetTemplateHtml: `{% raw %}{% endraw %}`,
      bundle: {},
      labels:
        '{"appstle.subscription.wg.noSubscriptionLabelTextV2":"No Subscription","appstle.subscription.wg.cancelAnytimeLabelTextV2":"Cancel Anytime","appstle.subscription.wg.weeksFrequencyTextV2":"Weeks","appstle.subscription.wg.weeklyLabelTextV2":"Weekly","appstle.subscription.wg.deliveryEveryFrequencyTextV2":"Delivery Every","appstle.subscription.wg.subscribeAndSaveInitalV2":"Subscribe & save","appstle.subscription.wg.daysFrequencyTextV2":"Days","appstle.subscription.wg.monthlyLabelTextV2":"Monthly","appstle.subscription.wg.subscribeAndSaveSuccessV2":"Subscribe success","appstle.subscription.wg.monthFrequencyTextV2":"Month","appstle.subscription.wg.yearsFrequencyTextV2":"Years","appstle.subscription.wg.onetimeDescriptionTextV2":"","appstle.subscription.wg.weekFrequencyTextV2":"Week","appstle.subscription.wg.oneTimePurchaseTextV2":"One Time Purchase","appstle.subscription.wg.loyaltyPerkDescriptionTextV2":"{{#isDiscountTypeFreeProduct}}<div style=\'display: flex;\'><div style=\'height: 60px; width: 60px; flex-shrink: 0; margin-right: 10px;\'><img style=\'width: 100%\' src={{{featured_image}}}></img></div><div>After {{{billingCycleBlock}}} orders,<span style=\'color: #ffc000;font-weight: 700;\';> get a FREE {{freeProductName}} </span></div><div>{{/isDiscountTypeFreeProduct}}{{#isDiscountTypePercentage}}After <span class=\'appstle-loyalty-billing-cycle\'><span class=\'appstle-loyalty-billing-cycle-count\'>{{{billingCycleBlock}}}</span> order</span>, <span class=\'appstle-loyalty-discount\'>get <span style=\'color: #ffc000;font-weight: 700;\';>{{{discount}}}% OFF your entire order</span></span>.{{/isDiscountTypePercentage}}{{#isDiscountTypeShipping}}After <span class=\'appstle-loyalty-billing-cycle\'><span class=\'appstle-loyalty-billing-cycle-count\'>{{{billingCycleBlock}}}</span> order</span>, <span class=\'appstle-loyalty-discount\'>get <span style=\'color: #ffc000;font-weight: 700;\';>shipping at {{{formatDiscountedPrice}}}</span></span>.{{/isDiscountTypeShipping}}{{#isDiscountTypeFixed}}After <span class=\'appstle-loyalty-billing-cycle\'><span class=\'appstle-loyalty-billing-cycle-count\'>{{{billingCycleBlock}}}</span> order</span>, <span class=\'appstle-loyalty-discount\'>get <span style=\'color: #ffc000;font-weight: 700;\';>{{{formatDiscountedPrice}}} OFF your entire order</span></span>.{{/isDiscountTypeFixed}}","appstle.subscription.wg.unsubscribeFrequencyTextV2":"unsubscribe","appstle.subscription.wg.widgetVariantChangeListenerSelectorV2":"","appstle.subscription.wg.oneTimeFrequencyTextV2":"One Time","appstle.subscription.wg.dayFrequencyTextV2":"day","appstle.subscription.wg.allowFulfilmentCountViaPropertiesV2":"false","appstle.subscription.wg.monthsFrequencyTextV2":"Months","appstle.subscription.wg.offFrequencyTextV2":"Off","appstle.subscription.wg.yearFrequencyTextV2":"Year","appstle.subscription.wg.prepayLabelTextV2":"Prepay","appstle.subscription.wg.productPageUnitPriceSelectorV2":"","appstle.subscription.wg.widgetPriceChangeListenerSelectorV2":"","appstle.subscription.wg.selectDeliverOptionV2":"select deliver option","appstle.subscription.wg.yearlyLabelTextV2":"Yearly"}',
      css: {
        appstle_subscription_widget: {
          'margin-top': '',
          'margin-bottom': '',
        },

        appstle_subscription_wrapper: {
          'border-width': '',
          'border-color': '',
        },

        appstle_circle: {
          'border-color': '',
        },

        appstle_dot: {
          'background-color': '',
        },

        appstle_select: {
          'padding-top': '',
          'padding-bottom': '',
          'padding-left': '',
          'padding-right': '',
          'border-width': '',
          'border-style': '',
          'border-color': '',
          'border-radius': '',
        },

        tooltip_subscription_svg: {
          fill: '',
        },

        appstle_tooltip: {
          color: '',
          'background-color': '',
        },

        appstle_tooltip_border_top_color: {
          'border-top-color': '',
        },

        appstle_subscription_final_price: {
          color: '',
        },
        appstle_widget_text_color: {
          color: '',
        },
        appstle_selected_background: {
          background: 'transparent',
        },
        customCSS: '',
        elementCSS: '[]',
        customerPortalCss: '',
        priceSelector: '',
        landingPagePriceSelector: '',
        quickViewClickSelector: '',
        badgeTop: '',
        pricePlacement: 'BEFORE',
      },
    };
  }

  function urlIsProductPage() {
    // return null != decodeURIComponent(window.location.pathname).match(/\/products\/(([a-zA-Z0-9]|[\-\.\_\~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[\ud83c\ud83d\ud83e][\ud000-\udfff]){1,})\/?/)
    return decodeURIComponent(window.location.pathname).includes('/products/');
  }
})(window);
