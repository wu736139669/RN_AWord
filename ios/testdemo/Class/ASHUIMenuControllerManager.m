//
//  ASHUIMenuControllerManager.m
//  testdemo
//
//  Created by xmfish on 16/2/19.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import "ASHUIMenuControllerManager.h"
#import <UIKit/UIKit.h>
#import "RCTConvert.h"
#import "RCTLog.h"
#import "RCTUtils.h"
#import "RCTBridge.h"
#import "RCTUIManager.h"
#import "UIViewController+Category.h"
@implementation ASHUIMenuControllerManager
{
  NSMapTable *_callbacks;
  UIMenuController *_menu;
}
RCT_EXPORT_MODULE();
- (dispatch_queue_t)methodQueue
{
  return dispatch_get_main_queue();
}
RCT_EXPORT_METHOD(hideMenu)
{
  if (_menu) {
    [_menu setMenuVisible:NO];
  }
}
RCT_EXPORT_METHOD(showMenuWithTitleArr:(NSArray*)titleArray withXPoint:(nonnull NSNumber*)xpoint withYPoint:(nonnull NSNumber*)ypoint withCallback:(RCTResponseSenderBlock)callback)
{
  if (!_callbacks) {
    _callbacks = [NSMapTable strongToStrongObjectsMapTable];
  }
  
  if(titleArray.count>0){
    NSMutableArray* itemArr = [NSMutableArray array];
    [titleArray enumerateObjectsUsingBlock:^(id  _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
      UIMenuItem *menuItem = [[UIMenuItem alloc] initWithTitle:obj action:@selector(meunClick:)];
      [itemArr addObject:menuItem];
    }];
    
    UIViewController *controller = RCTKeyWindow().rootViewController;
    
    while (controller.presentedViewController) {
      controller = controller.presentedViewController;
    }
    
    if (controller == nil) {
      RCTLogError(@"Tried to display MenuController but there is no application window. options: %@", titleArray);
      return;
    }
    controller.rnDelegate = self;
    UIView *sourceView = controller.view;
    [sourceView becomeFirstResponder];
    
    
    UIMenuController *menu = [UIMenuController sharedMenuController];
    [menu setMenuItems:itemArr];
    [menu setTargetRect:CGRectMake(xpoint.floatValue, ypoint.floatValue, 1.0, 1.0) inView:sourceView];
    [menu setMenuVisible:YES animated:YES];
    _menu = menu;
    [_callbacks setObject:callback forKey:menu];
  }else{
    callback(@[@"no title"]);
  }
}

-(void)meunClick:(UIMenuController*)menuController
{
  if ([_callbacks objectForKey:menuController]) {
    ((RCTResponseSenderBlock)[_callbacks objectForKey:menuController])(@[@"no title", @1]);
  }
}
@end
