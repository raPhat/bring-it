<?php

namespace Khill\FontAwesome\Tests;

use Khill\FontAwesome\FontAwesome;

class FontAwesomeTest extends FontAwesomeTestCase
{
    /**
     * @expectedException \InvalidArgumentException
     */
    public function testBadInputForIconOutputThroughConstructor()
    {
        echo new FontAwesome(12);
    }

    /**
     * @expectedException \InvalidArgumentException
     */
    public function testIconWithInvalidCustomAttribute()
    {
        echo $this->fa->fixedWidth('star')->addAttr(9.81, 'Tooltips!');
        echo $this->fa->fixedWidth('star')->addAttr('id', 9.81);
    }

    /**
     * @expectedException \InvalidArgumentException
     */
    public function testAddingInvalidClass()
    {
        echo $this->fa->fixedWidth('star')->addClass(3.14);
    }

    /**
     * @expectedException \Khill\FontAwesome\Exceptions\InvalidTransformationClass
     */
    public function testApplyingTransformationClassThatDoesntExistAsModifier()
    {
        echo $this->fa->upsideDown('twitter');
    }

    public function testCdnLinkOutput()
    {
        $this->expectOutputString(
            '<link rel="stylesheet" href="https://opensource.keycdn.com/fontawesome/4.7.0/font-awesome.min.css" integrity="sha384-dNpIIXE8U05kAbPhy3G1cz+yZmTzA6CY8Vg/u2L9xRnHjJiAK76m2BIEaSEV+/aU" crossorigin="anonymous">'
        );

        echo FontAwesome::css();
    }

    public function testStandardIconOutputThroughConstructor()
    {
        $this->expectOutputString('<i class="fa fa-star"></i>');

        echo new FontAwesome('star');
    }

    public function testStandardIconOutputThroughIconMethod()
    {
        $this->expectOutputString('<i class="fa fa-star"></i>');

        echo $this->fa->icon('star');
    }

    public function testStandardIconWithAdditionalClassOutputThroughIconMethod()
    {
        $this->expectOutputString('<i class="fa fa-star frameworkIcon"></i>');

        echo $this->fa->icon('star')->addClass('frameworkIcon');
    }

    public function testIconWithCustomAttributeOutput()
    {
        $this->expectOutputString('<i class="fa fa-star fa-fw" title="Tooltips!"></i>');

        echo $this->fa->fixedWidth('star')->addAttr('title', 'Tooltips!');
    }

    public function testIconWithCustomAttributesOutput()
    {
        $this->expectOutputString('<i class="fa fa-rocket fa-fw" title="Tooltips!" id="my-icon"></i>');

        echo $this->fa->fixedWidth('rocket')->addAttrs(array(
            'title' => 'Tooltips!',
            'id' => 'my-icon'
        ));
    }

    public function testFixedWidthIconOutput()
    {
        $this->expectOutputString('<i class="fa fa-star fa-fw"></i>');

        echo $this->fa->fixedWidth('star');
    }

    public function testFixedWidthIconOutputThroughInstanceChain()
    {
        $this->expectOutputString('<i class="fa fa-star fa-fw"></i>');

        echo $this->fa->icon('star')->fixedWidth();
    }

    public function testLargeIconOutput()
    {
        $this->expectOutputString('<i class="fa fa-star fa-lg"></i>');

        echo $this->fa->lg('star');
    }

    public function testLargeIconOutputThroughInstanceChain()
    {
        $this->expectOutputString('<i class="fa fa-star fa-lg"></i>');

        echo $this->fa->icon('star')->lg();
    }

    public function test2xIconOutput()
    {
        $this->expectOutputString('<i class="fa fa-star fa-2x"></i>');

        echo $this->fa->x2('star');
    }

    public function test2xIconOutputThroughInstanceChain()
    {
        $this->expectOutputString('<i class="fa fa-star fa-2x"></i>');

        echo $this->fa->icon('star')->x2();
    }

    public function test3xIconOutput()
    {
        $this->expectOutputString('<i class="fa fa-star fa-3x"></i>');

        echo $this->fa->x3('star');
    }

    public function test3xIconOutputThroughInstanceChain()
    {
        $this->expectOutputString('<i class="fa fa-star fa-3x"></i>');

        echo $this->fa->icon('star')->x3();
    }

    public function test4xIconOutput()
    {
        $this->expectOutputString('<i class="fa fa-star fa-4x"></i>');

        echo $this->fa->x4('star');
    }

    public function test4xIconOutputThroughInstanceChain()
    {
        $this->expectOutputString('<i class="fa fa-star fa-4x"></i>');

        echo $this->fa->icon('star')->x4();
    }

    public function test5xIconOutput()
    {
        $this->expectOutputString('<i class="fa fa-star fa-5x"></i>');

        echo $this->fa->x5('star');
    }

    public function test5xIconOutputThroughInstanceChain()
    {
        $this->expectOutputString('<i class="fa fa-star fa-5x"></i>');

        echo $this->fa->icon('star')->x5();
    }

    public function testPulledLeftIconOutput()
    {
        $this->expectOutputString('<i class="fa fa-star pull-left"></i>');

        echo $this->fa->left('star');
    }

    public function testPulledLeftIconOutputThroughInstanceChain()
    {
        $this->expectOutputString('<i class="fa fa-star pull-left"></i>');

        echo $this->fa->icon('star')->left();
    }

    public function testPulledRightIconOutput()
    {
        $this->expectOutputString('<i class="fa fa-star pull-right"></i>');

        echo $this->fa->right('star');
    }

    public function testPulledRightIconOutputThroughInstanceChain()
    {
        $this->expectOutputString('<i class="fa fa-star pull-right"></i>');

        echo $this->fa->icon('star')->right();
    }

    public function testInverseIconOutput()
    {
        $this->expectOutputString('<i class="fa fa-star fa-inverse"></i>');

        echo $this->fa->inverse('star');
    }

    public function testInverseIconOutputThroughInstanceChain()
    {
        $this->expectOutputString('<i class="fa fa-star fa-inverse"></i>');

        echo $this->fa->icon('star')->inverse();
    }

    public function testRotate90IconOutput()
    {
        $this->expectOutputString('<i class="fa fa-star fa-rotate-90"></i>');

        echo $this->fa->rotate90('star');
    }

    public function testRotate90IconOutputThroughInstanceChain()
    {
        $this->expectOutputString('<i class="fa fa-star fa-rotate-90"></i>');

        echo $this->fa->icon('star')->rotate90();
    }

    public function testRotate180IconOutput()
    {
        $this->expectOutputString('<i class="fa fa-star fa-rotate-180"></i>');

        echo $this->fa->rotate180('star');
    }

    public function testRotate180IconOutputThroughInstanceChain()
    {
        $this->expectOutputString('<i class="fa fa-star fa-rotate-180"></i>');

        echo $this->fa->icon('star')->rotate180();
    }

    public function testRotate270IconOutput()
    {
        $this->expectOutputString('<i class="fa fa-star fa-rotate-270"></i>');

        echo $this->fa->rotate270('star');
    }

    public function testRotate270IconOutputThroughInstanceChain()
    {
        $this->expectOutputString('<i class="fa fa-star fa-rotate-270"></i>');

        echo $this->fa->icon('star')->rotate270();
    }

    public function testFlipHorizontalIconOutput()
    {
        $this->expectOutputString('<i class="fa fa-star fa-flip-horizontal"></i>');

        echo $this->fa->flipHorizontal('star');
    }

    public function testFlipHorizontalIconOutputThroughInstanceChain()
    {
        $this->expectOutputString('<i class="fa fa-star fa-flip-horizontal"></i>');

        echo $this->fa->icon('star')->flipHorizontal();
    }

    public function testFlipVerticalIconOutput()
    {
        $this->expectOutputString('<i class="fa fa-star fa-flip-vertical"></i>');

        echo $this->fa->flipVertical('star');
    }

    public function testFlipVerticalIconOutputThroughInstanceChain()
    {
        $this->expectOutputString('<i class="fa fa-star fa-flip-vertical"></i>');

        echo $this->fa->icon('star')->flipVertical();
    }

    public function testSpinIconOutput()
    {
        $this->expectOutputString('<i class="fa fa-question-circle fa-spin"></i>');

        echo $this->fa->spin('question-circle');
    }

    public function testSpinIconOutputThroughInstanceChain()
    {
        $this->expectOutputString('<i class="fa fa-question-circle fa-spin"></i>');

        echo $this->fa->icon('question-circle')->spin();
    }

    public function testBorderIconOutput()
    {
        $this->expectOutputString('<i class="fa fa-trash fa-border"></i>');

        echo $this->fa->border('trash');
    }

    public function testBorderIconOutputThroughInstanceChain()
    {
        $this->expectOutputString('<i class="fa fa-trash fa-border"></i>');

        echo $this->fa->icon('trash')->border();
    }
}
