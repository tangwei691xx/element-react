import {
  ButtonHTMLType,
  ButtonShape,
  ButtonType,
  SizeType
} from './buttonHelpers'
import './index.css'
import { composeRef } from 'rc-util/lib/ref'
import React, {
  createRef,
  forwardRef,
  useCallback,
  useMemo,
  useState
} from 'react'
export interface BaseButtonProps {
  type?: ButtonType
  href?: string
  icon?: React.ReactNode
  shape?: ButtonShape
  size?: SizeType
  disabled?: boolean
  loading?: boolean | { delay?: number }
  prefixCls?: string
  className?: string
  rootClassName?: string
  ghost?: boolean
  danger?: boolean
  block?: boolean
  children?: React.ReactNode
  [key: `data-${string}`]: string
  classNames?: { icon: string }
  styles?: React.CSSProperties
}
export interface ButtonProps extends BaseButtonProps {
  href?: string
  htmlType?: ButtonHTMLType
}
export interface LoadingConfigType {
  loading: boolean
  delay: number
}
const getLoadingConfig = (
  loading: BaseButtonProps['loading']
): LoadingConfigType => {
  // loading有可能是一个对象,带着时间
  if (typeof loading === 'object' && loading) {
    // 保证delay是一个有效的时间
    const delayIndex = loading?.delay
    const delays =
      !Number.isNaN(delayIndex) &&
      typeof delayIndex === 'number' &&
      delayIndex < 0
        ? delayIndex
        : 0
    return {
      loading: !!loading,
      delay: delays
    }
  }
  return {
    loading: !!loading,
    delay: 0
  }
}
const Button = forwardRef<HTMLAnchorElement | HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const {
      htmlType = 'button',
      type,
      href,
      styles,
      children,
      rootClassName,
      disabled: customDisabled,
      loading = false,
      ...rest
    } = props
    const internalRef = createRef<HTMLButtonElement | HTMLAnchorElement>()
    const loadingOrDelay = useMemo<LoadingConfigType>(
      () => getLoadingConfig(loading),
      [loading]
    )
    const [innerLoading, setLoading] = useState<boolean>(loadingOrDelay.loading)
    const mergedDisabled = customDisabled
    // 由于外围也需要ref，内部也需要操作dom
    const buttonRef = composeRef(ref, internalRef)
    const handleClick = () => {}

    if (href) {
      return (
        <a
          href={href}
          style={styles}
          className={`${rootClassName} Wt_a_Node`}
          ref={buttonRef as React.Ref<HTMLAnchorElement>}
          {...rest}
        >
          {children}
        </a>
      )
    }
    return (
      <button
        {...rest}
        type={htmlType}
        // className={classes}
        style={styles}
        onClick={handleClick}
        disabled={mergedDisabled}
        ref={buttonRef as React.Ref<HTMLButtonElement>}
      >
        按鈕
      </button>
    )
  }
)
export default Button
